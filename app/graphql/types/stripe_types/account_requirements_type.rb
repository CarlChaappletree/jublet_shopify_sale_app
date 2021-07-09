module Types
  module StripeTypes
    class AccountRequirementsType < Types::BaseObject
      field :eventually_due, [String], null: false
    end
  end
end

