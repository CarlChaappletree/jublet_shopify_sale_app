class AddLegalAgreementToShops < ActiveRecord::Migration[6.0]
  def change
    add_column :shops, :legal_agreement, :boolean, default: false
  end
end
