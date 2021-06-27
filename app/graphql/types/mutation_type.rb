module Types
  class MutationType < Types::BaseObject
    field :update_shop, mutation: Mutations::UpdateShop
  end
end
