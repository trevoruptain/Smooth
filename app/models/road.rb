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
