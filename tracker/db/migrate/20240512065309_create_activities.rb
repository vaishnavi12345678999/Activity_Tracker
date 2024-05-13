class CreateActivities < ActiveRecord::Migration[7.1]
  def change
    create_table :activities do |t|
      t.references :user, null: false, foreign_key: true
      t.string :hostname
      t.string :url
      t.integer :time_spent

      t.timestamps
    end
  end
end
