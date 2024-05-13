class AddDateToActivities < ActiveRecord::Migration[7.1]
  def change
    add_column :activities, :date, :date
    add_index :activities, [:user_id, :url, :date], unique: true
  end
end
