class ProductListingsAddJob < ActiveJob::Base
  queue_as :shopify_webhook

  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end
    shop.with_shopify_session do
      check_metafields(webhook)
    end
  end

  private

  def check_metafields(webhook)
    product = ShopifyAPI::Product.find(webhook.dig('webhook', 'product_listing', 'product_id'))
    shop.increment_with_sql!('approved_products', 1) if product.metafields.any?
  end
end
