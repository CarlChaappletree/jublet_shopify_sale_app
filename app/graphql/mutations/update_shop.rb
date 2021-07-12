module Mutations
  class UpdateShop < BaseMutation
    argument :application_form, Types::ApplicationFormAttributes, required: false
    argument :legal_agreement, Boolean, required: false
    argument :connected, Boolean, required: false
    # TODO: Add update time
    # argument :connected_at, String, required: false

    field :shop, Types::ShopType, null: true
    field :errors, [String], null: false

    def resolve(**args)
      shop = Shop.find_by(shopify_domain: ShopifyAPI::Shop.current.domain)
      if shop.update(**args)
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

