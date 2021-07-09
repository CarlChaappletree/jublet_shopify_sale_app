module Types
  class MutationType < Types::BaseObject
    field :update_shop, mutation: Mutations::UpdateShop
    field :update_application, mutation: Mutations::UpdateApplication
    field :update_stripe_connect, mutation: Mutations::UpdateStripeConnect
  end
end
