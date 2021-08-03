module Queries
  class Shop < Queries::BaseQuery
    description 'Get a specific shop'

    type Types::ShopType, null: false

    def resolve
      shop = ::Shop.find_by!(shopify_domain: ShopifyAPI::Shop.current.domain)
      product_listings_count = ShopifyAPI::ProductListing.product_ids.count
      {
        id: shop.id,
        shopify_domain: shop.shopify_domain,
        legal_agreement: shop.legal_agreement,
        connected: shop.connected,
        approved: shop.approved,
        rejected: shop.rejected,
        rejected_reason: shop.rejected_reason,
        stripe_account_id: shop.stripe_account_id,
        has_stripe_account_completed_process: shop.has_stripe_account_completed_process,
        is_stripe_account_payouts_enabled: shop.is_stripe_account_payouts_enabled,
        product_listings_count: product_listings_count,
        approved_products: shop.products.where(approved: true).count
      }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.to_s)
    rescue => e
      GraphQL::ExecutionError.new(e.to_s)
    end
  end
end
