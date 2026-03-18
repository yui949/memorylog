class AddFieldsToPeople < ActiveRecord::Migration[7.0]
  def change
    add_column :people, :reliability, :string
    add_column :people, :other, :text
  end
end
