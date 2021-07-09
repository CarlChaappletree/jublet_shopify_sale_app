module Types
  class QueryType < Types::BaseObject
    field :shop, resolver: Queries::Shop
  end
end
