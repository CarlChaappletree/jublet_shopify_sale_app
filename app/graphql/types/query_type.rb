module Types
  class QueryType < Types::BaseObject

    #Get all shops
    field :all_shops, [ShopType], null: false
    def all_shops
      Shop.all
    end

    #Get a shop
    field :shop, ShopType, null: false do
      description 'Get a specific shop'
      argument :shopify_domain, String, required: true
    end
    def shop(shopify_domain:)
      Shop.find_by!(shopify_domain: shopify_domain)
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new("#{e}")
    rescue => e
      GraphQL::ExecutionError.new("#{e}")
    end
  end
end
