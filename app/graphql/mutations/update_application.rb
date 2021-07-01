module Mutations
  class UpdateApplication < BaseMutation
    argument :shopify_domain, String, required: true
    argument :form, Types::ApplicationFormAttributes, required: true

    field :shop, Types::ShopType, null: true
    field :errors, [String], null: false

    def resolve(shopify_domain:, form:)
      shop = Shop.find_by!(shopify_domain: shopify_domain)
      return {} unless shop

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
    end
  end
end

