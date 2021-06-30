FactoryBot.define do
  factory :shop do
    sequence(:shopify_domain) { |n| "Domain (#{n})" }
    sequence(:shopify_token) { |n| "Shopify token (#{n})" }
    sequence(:access_scopes) { |n| "access_scopes (#{n})" }
    sequence(:legal_agreement) { true }
  end
end
