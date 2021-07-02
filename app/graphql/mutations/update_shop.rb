module Mutations
  class UpdateShop < BaseMutation
    argument :shopify_domain, String, required: true

    # field :token, String, null: true
    field :shop, Types::ShopType, null: true
    field :errors, [String], null: false

    def resolve(shopify_domain:)
      shop = Shop.find_by(shopify_domain: shopify_domain)
      if shop.update(legal_agreement: true)
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
      GraphQL::ExecutionError.new("#{e}")
    rescue => e
      GraphQL::ExecutionError.new("#{e}")
    end
  end
end

