module Queries
  class Shop < Queries::BaseQuery
    description 'Get a specific shop'
    argument :shopify_domain, String, required: true

    type Types::ShopType, null: false

    def resolve(shopify_domain:)
      ::Shop.find_by!(shopify_domain: shopify_domain)
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("#{e}")
    rescue => e
      GraphQL::ExecutionError.new("#{e}")
    end
  end
end
