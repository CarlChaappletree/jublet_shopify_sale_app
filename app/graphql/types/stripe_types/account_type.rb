module Types
  module StripeTypes
    class AccountType < Types::BaseObject
      field :id, String, null: false
      field :requirements, Types::StripeTypes::AccountRequirementsType, null: false
    end
  end
end
