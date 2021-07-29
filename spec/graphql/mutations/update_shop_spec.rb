require 'rails_helper'

module Mutations
  RSpec.describe UpdateShop, type: :request, vcr: false, sendgrid: false  do
    describe '.resolve' do
      let(:shop) { create(:shop) }
      let(:form) {
        {
          email: 'cha@cha.com',
          fullName: 'Seungwoocha',
          instagram: 'instagram.com',
          phoneNumber: '01018488844',
          shopClassification: 'Some random shopify classification string',
          shopName: 'Shopify name',
          webSiteUrl: 'shopify.com website URl'
        }
      }
      before do
        controller_test_setup(shop)
      end
      it 'Updates shop' do
        post '/graphql', params: { query: query }
        expect(JSON.parse(response.body)['data']['updateShop']['shop']).to include(
          {
            'id' => shop.id.to_s,
            'connected' => true,
            'legalAgreement' => true,
            'approved' => false
          }
        )
      end

      it 'update shop with the application form' do
        post '/graphql', params: { query: query_with_form(form_arg: form) }

        expect(JSON.parse(response.body)['data']['updateShop']['shop']).to include(
          {
            'id' => shop.id.to_s,
          }
        )
      end
      #TODO: Add test for this
      # it "sends a confirmation email" do
      #   expect { post '/graphql', params: { query: query_with_form(form_arg: form) } }.to change(Sidekiq::Extensions::DelayedMailer.jobs, :size).by(1)
      # end

      # it "sends an application maile" do
      #   post '/graphql', params: { query: query_with_form(form_arg: form) }
      # end
      def query
        <<~GQL
          mutation {
            updateShop(input: {
              legalAgreement: true
              connected: true
            }) {
              shop {
                id
                connected
                legalAgreement
                approved
              }
              errors
            }
          }
        GQL
      end

      def query_with_form(form_arg:)
        <<~GQL
          mutation {
            updateShop(input: {
              applicationForm: {
                email: "#{form_arg[:email]}"
                fullName: "#{form_arg[:fullName]}"
                instagram: "#{form_arg[:instagram]}"
                phoneNumber: "#{form_arg[:phoneNumber]}"
                shopClassification: "#{form_arg[:shopClassification]}"
                shopName: "#{form_arg[:shopName]}"
                webSiteUrl: "#{form_arg[:webSiteUrl]}"
              }
            }) {
              shop {
                id
                shopifyDomain
                legalAgreement
                connected
                approved
              }
              errors
            }
          }
        GQL
      end
    end
  end
end
