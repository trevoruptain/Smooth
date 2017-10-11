require 'json'

# roadsFile = File.read('../road_network_data/data/processed/roads.json')
# roads = JSON.parse(roadsFile)

intersectionsFile = File.read('../road_network_data/data/processed/intersections.json')
intersections = JSON.parse(intersectionsFile)

crimesFile = File.read('../road_network_data/data/processed/crimes.json')
crimes = JSON.parse(crimesFile)

puts intersections[0]
puts crimes["data"][0]

crimes.each do |crime|
end
