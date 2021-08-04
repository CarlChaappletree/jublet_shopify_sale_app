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
      metafields_valid?(product, shop)
    end
  end

  private

  def metafields_valid?(product, shop)
    if product.metafields.any? { |m| m.namespace == 'sc-jublet' }
      # valid metafields
      create_or_find_by_product(product, shop, true)
    else
      # invalid metafields
      create_or_find_by_product(product, shop, false)
      Shopify::ResourceFeedbacksCreator.new(
        shopify_domain: shop.shopify_domain,
        product_id: product.id.to_s,
        product_updated_at: product.updated_at,
        shopify_token: shop.shopify_token,
        messages: ['Needs a Jublet category.']
      ).call
    end
  end

  # updates products if it already exists otherwise creates
  def create_or_find_by_product(product, shop, approved)
    if shop.products.any? { |p| p.shopify_product_id == product.id }
      shop.products.where(shopify_product_id: product.id).update(approved: approved)
    else
      shop.products.create(title: product.title, shopify_product_id: product.id, approved: approved)
    end
  end
end
