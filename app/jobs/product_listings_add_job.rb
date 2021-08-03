class ProductListingsAddJob < ActiveJob::Base
  queue_as :shopify_webhook

  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end
    shop.with_shopify_session do
      product_metafields_valid?(webhook, shop)
    end
  end

  private

  def product_metafields_valid?(webhook, shop)
    product = ShopifyAPI::Product.find(webhook.dig('product_listing', 'product_id'))
    return unless product.metafields.any? { |m| m.namespace == 'sc-jublet' }

    if shop.products.any? { |p| p.shopify_product_id == product.id }
      shop.products.where(shopify_product_id: product.id).update(approved: true)
    else
      shop.products.create(title: product.title, shopify_product_id: product.id, approved: true)
    end
  end
end
