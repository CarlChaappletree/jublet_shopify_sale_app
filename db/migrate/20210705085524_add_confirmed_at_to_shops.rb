class AddConfirmedAtToShops < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :approved, :boolean, default: false
    add_column :shops, :approved_at, :datetime
  end
end
