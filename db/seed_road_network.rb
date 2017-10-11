require 'json'

# roadsFile = File.read('../road_network_data/data/processed/roads.json')
# roads = JSON.parse(roadsFile)

intersectionsFile = File.read(File.expand_path('road_network_data/data/processed/intersections.json'))
intersections = JSON.parse(intersectionsFile)

# crimesFile = File.read('../road_network_data/data/processed/crimes.json')
# crimes = JSON.parse(crimesFile)

puts intersections[0]
# puts crimes["data"][0]
#
# crimes.each do |crime|
# end

intersections.each do |intersection|
  puts {id: intersection["id"], lat: intersection["location"]["lat"], lng: intersection["location"]["lng"]}
end
