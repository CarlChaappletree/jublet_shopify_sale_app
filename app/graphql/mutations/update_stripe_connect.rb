module Mutations
  class UpdateStripeConnect < BaseMutation
    description 'Update stripe account and returns a hosted stripe onboarding link'

    field :connect_link, String, null: false

    def resolve
      Stripe.api_key = ENV['STRIPE_API_KEY']
      begin
        shop = Shop.find_by(shopify_domain: ShopifyAPI::Shop.current.domain)
        if shop.stripe_account_id.blank?
          account = Stripe::Account.create({
                      type: 'express',
                      capabilities: {
                        card_payments: {
                          requested: true
                        },
                        transfers: {
                          requested: true
                        }
                      }
                    })
          shop.update!(stripe_account_id: account.id) if account
        else
          account = { id: shop.stripe_account_id }
        end
        link = Stripe::AccountLink.create({
                account: account[:id],
                refresh_url: 'https://example.com/reauth',
                return_url: 'https://example.com/return',
                type: 'account_onboarding'
              })
        {
          connect_link: link
        }
      rescue => e
        GraphQL::ExecutionError.new(e.to_s)
      end
    end
  end
end
