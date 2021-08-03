require 'rails_helper'

RSpec.describe ProductListingsRemoveJob, type: :job do
  let(:shop) { create(:shop) }
  before do
    ActiveJob::Base.queue_adapter = :test
  end

  it 'responds to #perform' do
    expect {
      ProductListingsUpdateJob.perform_later
    }.to have_enqueued_job(ProductListingsUpdateJob)
  end

  it 'matches with enqueued job' do
    expect {
      ProductListingsUpdateJob.perform_later
    }.to have_enqueued_job.at(:no_wait)
  end

  it 'matches with enqueued job' do
    expect {
      ProductListingsUpdateJob.perform_later
    }.to have_enqueued_job.at(:no_wait)
  end

  it 'removes product' do
    product = create(:product, shop: shop, shopify_product_id: 6955505320091)
    data = {"product_listing"=>{"product_id"=>product.shopify_product_id, "created_at"=>"2021-07-29T09:01:42+02:00", "updated_at"=>"2021-07-30T15:36:53+02:00", "body_html"=>"fjsdddssssssssasdfasdf2232323", "handle"=>"aged-pine", "product_type"=>"", "title"=>"aged asdsadfasdf", "vendor"=>"sales-channel-rails-react-store", "available"=>true, "tags"=>"", "published_at"=>"2021-07-30T15:36:53+02:00", "variants"=>[{"id"=>40652079693979, "title"=>"Default Title", "option_values"=>[{"option_id"=>8907389632667, "name"=>"Title", "value"=>"Default Title"}], "price"=>"6.00", "formatted_price"=>"6 kr", "compare_at_price"=>nil, "grams"=>0, "requires_shipping"=>true, "sku"=>"", "barcode"=>"", "taxable"=>true, "position"=>1, "available"=>true, "inventory_policy"=>"deny", "inventory_quantity"=>0, "inventory_management"=>nil, "fulfillment_service"=>"manual", "weight"=>0.0, "weight_unit"=>"kg", "image_id"=>nil, "created_at"=>"2021-07-29T09:01:42+02:00", "updated_at"=>"2021-07-29T17:52:07+02:00"}], "images"=>[], "options"=>[{"id"=>8907389632667, "name"=>"Title", "product_id"=>6944938393755, "position"=>1, "values"=>["Default Title"]}]}, "webhook"=>{"product_listing"=>{"product_id"=>6944938229915, "created_at"=>"2021-07-29T09:01:42+02:00", "updated_at"=>"2021-07-30T15:36:53+02:00", "body_html"=>"fjsdddssssssssasdfasdf2232323", "handle"=>"aged-pine", "product_type"=>"", "title"=>"aged asdsadfasdf", "vendor"=>"sales-channel-rails-react-store", "available"=>true, "tags"=>"", "published_at"=>"2021-07-30T15:36:53+02:00", "variants"=>[{"id"=>40652079693979, "title"=>"Default Title", "option_values"=>[{"option_id"=>8907389632667, "name"=>"Title", "value"=>"Default Title"}], "price"=>"6.00", "formatted_price"=>"6 kr", "compare_at_price"=>nil, "grams"=>0, "requires_shipping"=>true, "sku"=>"", "barcode"=>"", "taxable"=>true, "position"=>1, "available"=>true, "inventory_policy"=>"deny", "inventory_quantity"=>0, "inventory_management"=>nil, "fulfillment_service"=>"manual", "weight"=>0.0, "weight_unit"=>"kg", "image_id"=>nil, "created_at"=>"2021-07-29T09:01:42+02:00", "updated_at"=>"2021-07-29T17:52:07+02:00"}], "images"=>[], "options"=>[{"id"=>8907389632667, "name"=>"Title", "product_id"=>6944938229915, "position"=>1, "values"=>["Default Title"]}]}}}
    ProductListingsRemoveJob.perform_now(shop_domain: shop.shopify_domain, webhook: data)
    expect(Product.where(shopify_product_id: product.shopify_product_id)).not_to exist
  end

  it 'removes product by shopify admin panel' do
    # Confirmed that it trigger the product/listings remove webhook
  end
end
