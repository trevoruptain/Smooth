# == Schema Information
#
# Table name: roads
#
#  id               :integer          not null, primary key
#  intersection1_id :integer          not null
#  intersection2_id :integer          not null
#  street_name      :string
#  safety_rating    :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Road < ApplicationRecord
  attr_accessor :weight

  belongs_to :intersection_to,
    primary_key: :id,
    foreign_key: :intersection1_id,
    class_name: :Intersection

  belongs_to :intersection_from,
    primary_key: :id,
    foreign_key: :intersection2_id,
    class_name: :Intersection

  def self.map_user_prefs(road, elevation1, elevation2, user_prefs)
    # user_prefs = {flatness: 0.3, safety: 0.8, distance: 0.5}

    # del_elevation = elevation2 - elevation1
    # safety_rating = road.crime_rating / road.distance
    road.weight = 5 * road.distance * user_prefs[:distance]

    # road.attribute=(weight, new_weight)
                    #  3 * del_elevation * user_prefs.flatness + 
                    #  2 * safety_rating * user_prefs.safety + )
    road
  end
end
