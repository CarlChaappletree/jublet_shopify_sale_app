FactoryBot.define do
  factory :shop do
    sequence(:shopify_domain) { |n| "sync-app-02.myshopify.com" }
    sequence(:shopify_token) { |n| "Shopify token (#{n})" }
    sequence(:access_scopes) { |n| "access_scopes (#{n})" }
    sequence(:legal_agreement) { false }
    sequence(:approved) { false }
    sequence(:rejected) { false }
    sequence(:connected) { false }
    sequence(:bank_detail_updated_at) { false }
  end
end
