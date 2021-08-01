require 'rails_helper'

RSpec.describe Shop, type: :model do
  let(:shop) { create(:shop) }
  it 'is not valid with approved products under 0' do
    expect { shop.increment_with_sql!('approved_products', -1) }.to raise_error(ActiveRecord::RecordInvalid)

  end
  it 'is not valid with not approved products under 0' do
    expect { shop.increment_with_sql!('not_approved_products', -1) }.to raise_error(ActiveRecord::RecordInvalid)
  end
end
