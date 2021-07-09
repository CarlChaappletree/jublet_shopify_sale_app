module Queries
  class GetStripeAccountDetail < Queries::BaseQuery
    description 'Get a specific stripe account detail'

    type Types::StripeTypes::AccountType, null: false

    def resolve
      shop = ::Shop.find_by!(shopify_domain: ShopifyAPI::Shop.current.domain)
      raise 'Shop does not have the stripe account id' if shop.stripe_account_id.blank?

      Stripe::Account.retrieve(shop.stripe_account_id)
    rescue ActiveRecord::RecordInvalid => e
      GraphQL::ExecutionError.new(e.to_s)
    rescue => e
      GraphQL::ExecutionError.new(e.to_s)
    end
  end
end
