class AddValidProductsColumnToShop < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :approved_products, :integer, default: 0
  end
end
