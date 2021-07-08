module Queries
  class StripeConnect < Queries::BaseQuery
    description 'Get a hosted stripe onboarding link'

    type String, null: false

    def resolve
      Stripe.api_key = ENV['STRIPE_API_KEY']
      account = Stripe::Account.create({
        type: 'express',
        capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
        },
      })
      Stripe::AccountLink.create({
        account: account.id,
        refresh_url: 'https://example.com/reauth',
        return_url: 'https://example.com/return',
        type: 'account_onboarding'
      })
    rescue => e
      GraphQL::ExecutionError.new(e.to_s)
    end
  end
end
