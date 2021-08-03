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
      product_metafields = product.metafields
      if product_metafields.any? && product_metafields.any? { |m| m.namespace == 'sc-jublet' }
      end
    end
  end
end
