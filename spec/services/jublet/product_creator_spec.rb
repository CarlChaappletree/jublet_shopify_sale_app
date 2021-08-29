require 'rails_helper'

RSpec.describe Jublet::ProductCreator, type: :model, vcr: false do
  describe 'ProductCreator' do
    let(:shop) { create(:shop) }
    context '.call!' do
      it 'post request a product to jublet' do

      end

      it 'post request a product with product options' do

      end

      it 'post request a product with product valiant' do

      end
    end
  end
end
