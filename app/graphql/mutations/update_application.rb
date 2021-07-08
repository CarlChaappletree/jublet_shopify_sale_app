module Mutations
  class UpdateApplication < BaseMutation
    argument :form, Types::ApplicationFormAttributes, required: true

    field :shop, Types::ShopType, null: true
    field :errors, [String], null: false

    def resolve(form:)
      shop = Shop.find_by!(shopify_domain: ShopifyAPI::Shop.current.domain)
      if shop.update!(application_form: form)
        ShopApplicationNotifierMailer.send_application_email(form.to_h).deliver_later
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

