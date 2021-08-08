class ProductListingsUpdateJob < ActiveJob::Base
  include ShopifyProductValidatorHelper

  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end

    unless shop.approved
      logger.error("#{self.class} failed: shop '#{shop_domain}' is not approved by Jublet")
      return
    end

    shop.with_shopify_session do
      product = ShopifyAPI::Product.find(webhook.dig('product_listing', 'product_id'))

      if product_approved?(product)
        shop.products.where(shopify_product_id: product.id).update(approved: true)

        ::Shopify::ProductResourceFeedbacksCreator.new(
          shopify_domain: shop.shopify_domain,
          product_id: product.id.to_s,
          product_updated_at: product.updated_at,
          shopify_token: shop.shopify_token
        ).valid!
      else
        shop.products.where(shopify_product_id: product.id).update(approved: false)

        ::Shopify::ProductResourceFeedbacksCreator.new(
          shopify_domain: shop.shopify_domain,
          product_id: product.id.to_s,
          product_updated_at: product.updated_at,
          shopify_token: shop.shopify_token,
          feedbacks: {
            jublet_category_valid?: product.metafields.any? { |m| m.namespace == 'sc-jublet' },
            description_valid?: product.body_html.present?,
            image_valid?: product.images.present?
          }
        ).invalid!
      end
    end
  end
end
