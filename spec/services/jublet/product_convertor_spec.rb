require 'rails_helper'

RSpec.describe Jublet::ProductConvertor, type: :model, vcr: false do
  describe 'ProductCreator' do
    let(:shop) { create(:shop) }
    let(:jublet_product) {
      {
        "product": {
          "id": 1,
          "shopify_product_id": 6955504926875,
          "name": 'The Other Product2',
          "description": 'This is description',
          "vendor_id": 1,
          "slug": 'the-other-product2',
          "price": 19.99,
          "option_types": ['size', 'color'],
          "shipping_category_id": 1,
          "taxon_ids": [2],
          "product_link": 'Jublet.com',
          "product_image_src": 'shopify.product.image',
          "variants": [
            {
              "price": 19.99,
              "cost_price": 17.0,
              "sku": 'SKU-3',
              "is_master": 0,
              "track_inventory": true,
              "options": [
                {
                  "name": 'size',
                  "value": 'small'
                },
                {
                  "name": 'color',
                  "value": 'black'
                }
              ]
            },
            {
              "price": 19.99,
              "cost_price": 17.0,
              "sku": 'SKU-3',
              "is_master": 0,
              "track_inventory": true,
              "options": [
                {
                  "name": 'size',
                  "value": 'small'
                },
                {
                  "name": 'color',
                  "value": 'black'
                }
              ]
            }
          ]
        }
      }
    }
    let(:shopify_product) {
      "{\"id\":6955504926875,\"title\":\"long pine\",\"body_html\":\"12\",\"vendor\":\"sales-channel-rails-react-store\",\"product_type\":\"\",\"created_at\":\"2021-08-02T18:50:01+02:00\",\"handle\":\"long-pine\",\"updated_at\":\"2021-08-10T14:43:09+02:00\",\"published_at\":\"2021-08-03T18:36:24+02:00\",\"template_suffix\":\"\",\"status\":\"active\",\"published_scope\":\"web\",\"tags\":\"\",\"admin_graphql_api_id\":\"gid://shopify/Product/6955504926875\",\"variants\":[{\"id\":40687529164955,\"title\":\"Default Title\",\"price\":\"8.00\",\"sku\":\"\",\"position\":1,\"inventory_policy\":\"deny\",\"compare_at_price\":null,\"fulfillment_service\":\"manual\",\"inventory_management\":null,\"option1\":\"Default Title\",\"option2\":null,\"option3\":null,\"created_at\":\"2021-08-02T18:50:01+02:00\",\"updated_at\":\"2021-08-08T11:13:03+02:00\",\"taxable\":true,\"barcode\":\"\",\"grams\":0,\"image_id\":null,\"weight\":0.0,\"weight_unit\":\"kg\",\"inventory_item_id\":42782739038363,\"inventory_quantity\":0,\"requires_shipping\":true,\"admin_graphql_api_id\":\"gid://shopify/ProductVariant/40687529164955\"}],\"options\":[{\"product_id\":6955504926875,\"id\":8921500254363,\"name\":\"Title\",\"position\":1,\"values\":[\"Default Title\"]}],\"images\":[{\"id\":31965393911963,\"position\":1,\"created_at\":\"2021-08-08T11:13:22+02:00\",\"updated_at\":\"2021-08-08T11:13:22+02:00\",\"alt\":null,\"width\":700,\"height\":1084,\"src\":\"https://cdn.shopify.com/s/files/1/0575/7471/9643/products/Pretty-vintage-inspired-olive-plaid-gingham-top-C541T_7_1084x_1b546026-c7cc-4595-9640-ed7654e892e0.jpg?v=1628414002\",\"variant_ids\":[],\"admin_graphql_api_id\":\"gid://shopify/ProductImage/31965393911963\"}],\"image\":{\"id\":31965393911963,\"position\":1,\"created_at\":\"2021-08-08T11:13:22+02:00\",\"updated_at\":\"2021-08-08T11:13:22+02:00\",\"alt\":null,\"width\":700,\"height\":1084,\"src\":\"https://cdn.shopify.com/s/files/1/0575/7471/9643/products/Pretty-vintage-inspired-olive-plaid-gingham-top-C541T_7_1084x_1b546026-c7cc-4595-9640-ed7654e892e0.jpg?v=1628414002\",\"variant_ids\":[],\"admin_graphql_api_id\":\"gid://shopify/ProductImage/31965393911963\"}}"
    }
    context '.call!' do
      it 'converts product attributes from shopify to jublet' do
        res = Jublet::ProductConvertor.new(shopify_product: JSON(shopify_product)).call!
        expect(res).to eq(jublet_product)
      end
    end
  end
end
