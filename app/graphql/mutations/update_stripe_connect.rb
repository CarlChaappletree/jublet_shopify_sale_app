module Mutations
  class UpdateStripeConnect < BaseMutation
    description 'Update stripe account and returns a hosted stripe onboarding link'

    field :connect_link, String, null: false

    def resolve
      begin
        shop = Shop.find_by!(shopify_domain: ShopifyAPI::Shop.current.domain)
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
                # TODO: URL will be one of customer support knowledge base
                # Ex) jublet.com/support/stripe_account_error
                refresh_url: 'https://jublet.com/shop_application/about',
                return_url: 'https://jublet.com/about',
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
