module Queries
  class Shop < Queries::BaseQuery
    description 'Get a specific shop'

    type Types::ShopType, null: false

    def resolve
      ::Shop.find_by!(shopify_domain: ShopifyAPI::Shop.current.domain)
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.to_s)
    rescue => e
      GraphQL::ExecutionError.new(e.to_s)
    end
  end
end
