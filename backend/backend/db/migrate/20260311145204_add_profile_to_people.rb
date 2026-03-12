class AddProfileToPeople < ActiveRecord::Migration[7.0]
  def change
    add_column :people, :mbti, :string
    add_column :people, :blood_type, :string
  end
end
