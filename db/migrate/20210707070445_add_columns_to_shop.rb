class AddColumnsToShop < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :bank_detail_updated_at, :datetime
    add_column :shops, :application_form, :jsonb, null: false, default: '{}'
    add_column :shops, :legal_agreement, :boolean, null: false, default: false
    add_column :shops, :connected, :boolean, null: false, default: false
    add_column :shops, :connected_at, :datetime
    add_column :shops, :approved, :boolean, null: false, default: false
    add_column :shops, :approved_at, :datetime
    add_column :shops, :rejected, :boolean, null: false, default: false
    add_column :shops, :rejected_reason, :string
    add_column :shops, :stripe_account_id, :string
    add_column :shops, :stripe_account_status, :string
  end
end
