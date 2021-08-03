module Types
  class ShopType < Types::BaseObject
    field :id, ID, null: false
    field :shopify_domain, String, null: false
    field :legal_agreement, Boolean, null: false
    field :connected, Boolean, null: false
    field :approved, Boolean, null: false
    field :rejected, Boolean, null: false
    field :rejected_reason, String, null: true
    field :stripe_account_id, String, null: true
    field :has_stripe_account_completed_process, Boolean, null: true
    field :is_stripe_account_payouts_enabled, Boolean, null: true
    field :approved_products, Int, null: true
  end
end
