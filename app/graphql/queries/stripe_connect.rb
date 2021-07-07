module Queries
  class StripeConnect < Queries::BaseQuery
    description 'Get a hosted stripe onboarding link'

    type String, null: false

    def resolve
      Stripe.api_key = ENV['STRIPE_API_KEY']
      account = Stripe::Account.create({
        type: 'custom',
        business_type: 'individual',
        requested_capabilities: %w[card_payments transfers]
      })
      account_links = Stripe::AccountLink.create({
        account: account.id,
        refresh_url: 'https://example.com/reauth',
        return_url: 'https://example.com/return',
        type: 'custom_account_verification',
        collect: 'eventually_due'
      })
      account_links
      rescue => e
        GraphQL::ExecutionError.new(e.to_s)
    end
  end
end
