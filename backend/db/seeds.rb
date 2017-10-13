require 'json'

intersectionsFile = File.read(File.expand_path('road_network_data/data/processed/intersections.json'))
intersections = JSON.parse(intersectionsFile)

intersections.each do |intersection|
  begin
    Intersection.create(id: intersection["id"], lat: intersection["location"]["lat"], lng: intersection["location"]["lng"], elevation: intersection["elevation"])
  rescue
    puts intersection
  end
end


roadsFile = File.read(File.expand_path('road_network_data/data/processed/roads.json'))
roads = JSON.parse(roadsFile)

roads.each do |road|
  begin
    total_crime_rating = road["totalCrimeRating"] ? road["totalCrimeRating"] : 0
    Road.create(id: road["id"], intersection1_id: road["intersection1_id"],
      intersection2_id: road["intersection2_id"],
      street_name: road["street_name"],
      nearby_crimes_ids: road["crimeIds"],
      total_crime_rating: total_crime_rating,
      distance: road["distance"])
  rescue
    puts "------------------"
    puts road["id"]
    puts road["intersection1_id"]
    puts road["intersection2_id"]
  end
end
