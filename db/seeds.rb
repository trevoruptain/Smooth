# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# 
# require 'json'
#
# intersectionsFile = File.read(File.expand_path('road_network_data/data/processed/intersections.json'))
# intersections = JSON.parse(intersectionsFile)
#
# intersections.each do |intersection|
#   begin
#     Intersection.create(id: intersection["id"], lat: intersection["location"]["lat"], lng: intersection["location"]["lng"], elevation: intersection["elevation"])
#   rescue
#     puts intersection
#   end
# end
#
#
# roadsFile = File.read(File.expand_path('road_network_data/data/processed/roads.json'))
# roads = JSON.parse(roadsFile)
#
# roads.each do |road|
#   begin
#     Road.create(id: road["id"], intersection1_id: road["intersection1_id"],
#       intersection2_id: road["intersection2_id"],
#       street_name: road["street_name"],
#       nearby_crimes_ids: road["crimeIds"],
#       total_crime_rating: road["totalCrimeRating"],
#       distance: road["distance"])
#   rescue
#     puts road
#   end
# end
