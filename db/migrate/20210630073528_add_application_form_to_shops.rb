class AddApplicationFormToShops < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :application_form, :jsonb, null: false, default: '{}'
  end
end
