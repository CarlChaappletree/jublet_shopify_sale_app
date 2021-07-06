class AddRejectedAndRejectedReasonToShops < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :rejected, :boolean, default: false
    add_column :shops, :rejected_reason, :string
  end
end
