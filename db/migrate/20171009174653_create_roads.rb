class CreateRoads < ActiveRecord::Migration[5.1]
  def change
    create_table :roads do |t|
      t.integer :intersection1_id, null: false
      t.integer :intersection2_id, null: false
      t.string :street_name
      t.string :nearby_crimes_ids
      t.integer :total_crime_rating, null: false
      t.timestamps
    end

    add_index :roads, :intersection1_id
    add_index :roads, :intersection2_id
    add_index :roads, %i[intersection1_id intersection2_id], unique: true
  end
end
