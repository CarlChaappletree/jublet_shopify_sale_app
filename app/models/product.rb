# frozen_string_literal: true
class Product < ActiveRecord::Base
  belongs_to :shop
  validates :shopify_product_id, uniqueness: true, presence: true
end
