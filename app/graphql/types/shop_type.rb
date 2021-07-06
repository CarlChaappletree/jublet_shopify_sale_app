module Types
  class ShopType < Types::BaseObject
    field :id, ID, null: false
    field :shopify_domain, String, null: false
    field :legal_agreement, String, null: false
    field :connected, String, null: false
    field :approved, String, null: false
  end
end
