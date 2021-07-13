FactoryBot.define do
  factory :shop do
    sequence(:shopify_domain) { ENV['SHOPIFY_TEST_DOMAIN'] }
    sequence(:shopify_token) { ENV['SHOPIFY_TEST_TOKEN'] }
    sequence(:access_scopes) { |n| "read_products" }
    sequence(:legal_agreement) { false }
    sequence(:approved) { false }
    sequence(:rejected) { false }
    sequence(:connected) { false }
  end
end
