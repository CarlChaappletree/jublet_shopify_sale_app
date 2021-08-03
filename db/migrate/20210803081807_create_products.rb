class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string 'title', default: '', null: false
      t.boolean 'approved', default: false
      t.belongs_to :shop, index: true, foreign_key: true
      t.timestamps
    end
  end
end
