module Types
  class QueryType < Types::BaseObject
    field :shop, resolver: Queries::Shop
    field :stripe_connect, resolver: Queries::StripeConnect
  end
end
