module Queries
  class ProductListing < Queries::BaseQuery
    description 'Get productListing'

    type Types::ProductListingType, null: false

    def resolve
      product_listings = ShopifyAPI::ProductListing
      {
        ids: product_listings.product_ids
      }
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.to_s)
    rescue => e
      GraphQL::ExecutionError.new(e.to_s)
    end
  end
end
