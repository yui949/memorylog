class CreatePeople < ActiveRecord::Migration[7.0]
  def change
    create_table :people do |t|
      t.string :name
      t.string :group
      t.text :memo

      t.timestamps

      t.references :person, null: false, foreign_key: true
    end
  end
end
