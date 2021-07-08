module Mutations
  class UpdateShop < BaseMutation
    field :shop, Types::ShopType, null: true
    field :errors, [String], null: false

    def resolve
      shop = Shop.find_by(shopify_domain: ShopifyAPI::Shop.current.domain)
      if shop.update(legal_agreement: true, connected: true, connected_at: Time.current)
        {
            shop: shop,
            errors: []
        }
      else
        {
            shop: nil,
            errors: shop.errors.full_messages
        }
      end
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.to_s)
    rescue => e
      GraphQL::ExecutionError.new(e.to_s)
    end
  end
end

