class AddColumnsToShop < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :bank_detail_updated_at, :datetime
    add_column :shops, :application_form, :jsonb, null: false, default: '{}'
    add_column :shops, :legal_agreement, :boolean, default: false
    add_column :shops, :connected, :boolean, default: false
    add_column :shops, :connected_at, :datetime
    add_column :shops, :approved, :boolean, default: false
    add_column :shops, :approved_at, :datetime
    add_column :shops, :rejected, :boolean, default: false
    add_column :shops, :rejected_reason, :string
  end
end
