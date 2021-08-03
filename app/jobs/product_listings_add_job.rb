class ProductListingsAddJob < ActiveJob::Base
  queue_as :shopify_webhook

  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end
    shop.with_shopify_session do
      product = ShopifyAPI::Product.find(webhook.dig('product_listing', 'product_id'))
      if product.metafields.any? { |m| m.namespace == 'sc-jublet' }
        create_or_find_by_product(product, shop, true)
      else
        create_or_find_by_product(product, shop, false)
      end
    end
  end

  private

  # to prevent
  def create_or_find_by_product(product, shop, approved)
    if shop.products.any? { |p| p.shopify_product_id == product.id }
      shop.products.where(shopify_product_id: product.id).update(approved: approved)
    else
      shop.products.create(title: product.title, shopify_product_id: product.id, approved: approved)
    end
  end
end
