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
      if product.metafields.any? { |m| m.namespace == 'sc-jublet' }
        shop_product.update(approved: true)
      else
        shop_product.update(approved: false)
      end
    end
  end
end
