class ProductsCreateJob < ActiveJob::Base
  queue_as :shopify_webhook

  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)
    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end
    # TODO: figure out what it is.
    # shop.with_shopify_session do
    # end
  end
end
