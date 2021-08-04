class ProductListingsUpdateJob < ActiveJob::Base
  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end

    shop.with_shopify_session do
      product = ShopifyAPI::Product.find(webhook.dig('product_listing', 'product_id'))
      shop_product = shop.products.where(shopify_product_id: product.id)
      metafields_valid?(shop_product, shop)
    end
  end

  private

  def metafields_valid?(shop_product, shop)
    if product.metafields.any? { |m| m.namespace == 'sc-jublet' }
      # valid metafields
      shop_product.update(approved: true)
    else
      shop_product.update(approved: false)
      # invalid metafields
      create_or_find_by_product(product, shop, false)

      ::Shopify::ResourceFeedbacksCreator.new(
        shopify_domain: shop.shopify_domain,
        product_id: product.id.to_s,
        product_updated_at: product.updated_at,
        shopify_token: shop.shopify_token,
        messages: ['Needs a Jublet category.']
      ).call
    end

  end
end
