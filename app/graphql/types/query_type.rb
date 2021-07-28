module Types
  class QueryType < Types::BaseObject
    field :shop, resolver: Queries::Shop
    field :product_listing, resolver: Queries::ProductListing
    field :get_stripe_account_detail, resolver: Queries::GetStripeAccountDetail
  end
end
