class ProductListingsAddJob < ActiveJob::Base
  queue_as :shopify_webhook

  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end
    shop.with_shopify_session do
      product = ShopifyAPI::Product.find(webhook.dig('webhook', 'product_listing', 'product_id'))
      if product.metafields.any?
        # if valid increment approved_products
      else
        # mark as product not_approved and save
      end
    end

  end
end
