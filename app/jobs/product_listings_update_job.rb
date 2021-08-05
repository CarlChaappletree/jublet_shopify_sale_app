class ProductListingsUpdateJob < ActiveJob::Base
  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end

    shop.with_shopify_session do
      metafields_valid?(ShopifyAPI::Product.find(webhook.dig('product_listing', 'product_id')), shop)
    end
  end

  private

  def metafields_valid?(get_product, shop)
    product = shop.products.where(shopify_product_id: get_product.id)
    if get_product.metafields.any? { |m| m.namespace == 'sc-jublet' }
      # valid metafields
      product.update(approved: true)
    else
      # invalid metafields
      product.update(approved: false)

      ::Shopify::ResourceFeedbacksCreator.new(
        shopify_domain: shop.shopify_domain,
        product_id: get_product.id.to_s,
        product_updated_at: get_product.updated_at,
        shopify_token: shop.shopify_token,
        messages: ['Needs a Jublet category.']
      ).call
    end

  end
end
