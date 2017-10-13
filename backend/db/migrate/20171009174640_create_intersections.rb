class CreateIntersections < ActiveRecord::Migration[5.1]
  def change
    create_table :intersections do |t|
      t.decimal :lat, null: false
      t.decimal :lng, null: false
      t.decimal :elevation, null: false
      t.timestamps
    end

    add_index :intersections, :lat
    add_index :intersections, :lng
    add_index :intersections, :id
  end
end
