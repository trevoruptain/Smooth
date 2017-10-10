class CreateRoads < ActiveRecord::Migration[5.1]
  def change
    create_table :roads do |t|
      t.integer :intersection1_id, null: false
      t.integer :intersection2_id, null: false
      t.string :street_name
      t.integer :safety_rating, null: false
      t.timestamps
    end

    add_index :roads, :street_name
    add_index :taggings, %i[intersection1_id intersection2_id], unique: true
  end
end
