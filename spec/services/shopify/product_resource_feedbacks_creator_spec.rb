require 'rails_helper'

RSpec.describe Shopify::ProductResourceFeedbacksCreator, type: :model, vcr: true do
  describe 'ProductResourceFeedbacksCreator' do
    let(:shop) { create(:shop) }
    context '.invalid!' do
      it 'return status 200 with proper arg' do
        product = {
          id: 6955505254555,
          updated_at: Time.current
        }

        res = Shopify::ProductResourceFeedbacksCreator.new(
          shopify_domain: shop.shopify_domain,
          product_id: product[:id],
          product_updated_at: product[:updated_at],
          shopify_token: shop.shopify_token,
          feedbacks: {
            jublet_category_valid?: false,
            description_valid?: false,
            image_valid?: false
          }
        ).invalid!
        expect(res).to eq(true)
      end

      it 'raise error if api fails' do
        product = OpenStruct.new({
          id: 1234567890,
          updated_at: '2021-07-30T15:36:53+02:00'
        })
        expect {
          Shopify::ProductResourceFeedbacksCreator.new(
            shopify_domain: shop.shopify_domain,
            product_id: product[:id],
            product_updated_at: product[:updated_at],
            shopify_token: shop.shopify_token,
            feedbacks: {
              jublet_category_valid?: false,
              description_valid?: false,
              image_valid?: false
            }
          ).invalid!
        }.to raise_error(Faraday::ResourceNotFound)
      end
    end

    context '.valid!' do
      it 'return status 200 with proper arg' do
        product = {
          id: 6955505057947,
          updated_at: Time.current
        }

        res = Shopify::ProductResourceFeedbacksCreator.new(
          shopify_domain: shop.shopify_domain,
          product_id: product[:id],
          product_updated_at: product[:updated_at],
          shopify_token: shop.shopify_token
        ).valid!
        expect(res).to eq(true)
      end

      it 'raise error if api fails' do
        product = OpenStruct.new({
          id: 1234567890,
          updated_at: '2021-07-30T15:36:53+02:00'
        })
        expect {
          Shopify::ProductResourceFeedbacksCreator.new(
            shopify_domain: shop.shopify_domain,
            product_id: product[:id],
            product_updated_at: product[:updated_at],
            shopify_token: shop.shopify_token
          ).valid!
        }.to raise_error(Faraday::ResourceNotFound)
      end
    end
  end
end
