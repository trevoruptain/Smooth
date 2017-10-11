# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171009174653) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "intersections", force: :cascade do |t|
    t.decimal "lat", null: false
    t.decimal "lng", null: false
    t.decimal "elevation", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["id"], name: "index_intersections_on_id"
    t.index ["lat"], name: "index_intersections_on_lat"
    t.index ["lng"], name: "index_intersections_on_lng"
  end

  create_table "roads", force: :cascade do |t|
    t.integer "intersection1_id", null: false
    t.integer "intersection2_id", null: false
    t.string "street_name"
    t.string "nearby_crimes_ids"
    t.integer "total_crime_rating", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["intersection1_id", "intersection2_id"], name: "index_roads_on_intersection1_id_and_intersection2_id", unique: true
    t.index ["intersection1_id"], name: "index_roads_on_intersection1_id"
    t.index ["intersection2_id"], name: "index_roads_on_intersection2_id"
  end

end
