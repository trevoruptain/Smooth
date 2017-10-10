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
  belongs_to :intersection_to,
    primary_key: :id,
    foreign_key: :intersection1_id,
    class_name: :Intersection

  belongs_to :intersection_from,
    primary_key: :id,
    foreign_key: :intersection2_id,
    class_name: :Intersection
end
