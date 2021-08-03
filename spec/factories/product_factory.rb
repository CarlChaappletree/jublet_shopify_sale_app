FactoryBot.define do
  factory :product do
    title { Faker::Name.name }
    shopify_product_id { Faker::Number.number(digits: 10) }
    association :shop
    approved { false }
  end
end
