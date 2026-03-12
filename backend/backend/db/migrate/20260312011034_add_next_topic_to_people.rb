class AddNextTopicToPeople < ActiveRecord::Migration[7.0]
  def change
    add_column :people, :next_topic, :text
  end
end
