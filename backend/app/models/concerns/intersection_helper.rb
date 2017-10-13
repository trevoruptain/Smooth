module IntersectionHelper
  extend ActiveSupport::Concern
    module ClassMethods

    def lat_to_meters(lat)
        110992.18 * lat
    end
    
    def lng_to_meters(lng)
        88101.33 * lng
    end

    def midpoint_in_meters(mid)
        {lat: lat_to_meters(mid[:lat]), lng: lng_to_meters(mid[:lng])}
    end

    def midpoint(pos1, pos2)
        {lng: ((pos1.lng + pos2.lng) / 2), lat: ((pos1.lat + pos2.lat) / 2)}
    end

    def distance(pos1, pos2)
        Math.sqrt((pos2[:x] - pos1[:x]) ** 2 + (pos2[:y] - pos1[:y]) ** 2)
    end
  end
end