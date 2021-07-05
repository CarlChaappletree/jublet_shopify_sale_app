class AddConnectedToShops < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :connected, :boolean, default: false
    add_column :shops, :connected_at, :datetime
  end
end
