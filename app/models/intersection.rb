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

  def nodes_to_obj(nodes)
    nodes_hash = {}
    nodes.each do |node|
      nodes_hash[node.id] = node
    end
    nodes_hash
  end

  def find_route(start_id, end_id, user_prefs)
    start_node = Intersection.find(start_id)
    nodes_arr = Intersection.includes(:roads)
    all_nodes = nodes_to_obj(nodes_arr)
    seen = [start_node]
    visited = []

    loop do
      current_node = seen.shift
      visited.push(current_node)

      break if current_node.id == end_id

      current_node.roads.each do |road|
        next_id = road.intersection1_id == current_node.id ? road.intersection2_id : road.intersection1_id
        next_node = all_nodes[next_id]

        road = Road.map_user_prefs(road, current_node.elevation, next_node.elevation, user_prefs)
        new_weight = current_node.weight + road.weight

        if !seen.includes(next_node)
          next_node[:weight] = new_weight 
          next_node[:node_from_id] = current_node.id

          seen.each_with_index do |node, i|
            if node.weight > next_node.weight
              seen.insert(next_node, i)
              break
            end
          end
        elsif !visited.includes(next_node) && new_weight < next_node.weight 
          next_node[:weight] = new_weight
          next_node[:node_from_id] = current_node.id
        end
      end
    end

    current = visited.last
    path = []

    until current.node_from_id == nil
      path.unshift(current.id)
      current = all_nodes[current.node_from_id]
    end

    path
  end
end
