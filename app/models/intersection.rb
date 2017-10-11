# == Schema Information
#
# Table name: intersections
#
#  id         :integer          not null, primary key
#  lat        :decimal(, )      not null
#  lng        :decimal(, )      not null
#  elevation  :decimal(, )      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Intersection < ApplicationRecord
  has_many :roads_to,
    primary_key: :id,
    foreign_key: :intersection1_id,
    class_name: :Road

  has_many :roads_from,
    primary_key: :id,
    foreign_key: :intersection2_id,
    class_name: :Road

  def roads
    self.roads_to + self.roads_from
  end

  has_many :intersection_tos,
    through: :roads_to

  has_many :intersection_froms,
    through: :roads_from

  def siblings
    self.intersection_tos + self.intersection_froms
  end

end
