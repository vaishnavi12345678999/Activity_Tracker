class CreateRestrictedSites < ActiveRecord::Migration[7.1]
  def change
    create_table :restricted_sites do |t|
      t.string :hostname
      t.references :user, null: false, foreign_key: true

      t.timestamps
      
    end
    add_index :restricted_sites, [:user_id, :hostname], unique: true
  end
end
