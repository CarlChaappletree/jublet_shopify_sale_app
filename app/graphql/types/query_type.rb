module Types
  class QueryType < Types::BaseObject
    field :shop, resolver: Queries::Shop
    field :get_stripe_account_detail, resolver: Queries::GetStripeAccountDetail
  end
end
