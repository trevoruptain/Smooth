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
  include IntersectionHelper
  attr_accessor :node_from_id
  attr_writer :weight

  def weight
    @weight || Float::INFINITY
  end

  has_many :roads_to,
    primary_key: :id,
    foreign_key: :intersection1_id,
    class_name: :Road

  has_many :roads_from,
    primary_key: :id,
    foreign_key: :intersection2_id,
    class_name: :Road

  def roads
    roads_to + roads_from
  end

  has_many :intersection_tos,
    through: :roads_to

  has_many :intersection_froms,
    through: :roads_from

  def siblings
    intersection_tos + intersection_froms
  end

  def self.nodes_to_obj(nodes)
    nodes_hash = {}
    nodes.each do |node|
      nodes_hash[node.id] = node
    end
    nodes_hash
  end

  # Intersection.find_route(1, 745, {distance:1})

  def self.snap_position(lat, lng)
    pos = { x: lng_to_meters(lng), y: lat_to_meters(lat)}
    
    nodes_arr = Intersection.all[0, 100]
    closest_node = nil
    min_distance = Float::INFINITY

    nodes_arr.each do |node|
      node_pos = {x: lng_to_meters(node[:lng]), y: lat_to_meters(node[:lat])}
      distance = distance(pos, node_pos)
      if distance < min_distance
        closest_node = node
        min_distance = distance
      end
    end

    p min_distance
    closest_node
  end

  def self.find_route(start_id, end_id, user_prefs)
    start_node = Intersection.find(start_id)
    end_node = Intersection.find(end_id) 
    start_node.weight = 0

    mid = midpoint(start_node, end_node)
    m_x = lng_to_meters(mid[:lng])
    m_y = lat_to_meters(mid[:lat])
    range = distance({x: lng_to_meters(mid[:lng]), y: lat_to_meters(mid[:lat])}, 
                     {x: lng_to_meters(start_node.lng), y: lat_to_meters(start_node.lat)})

    nodes_arr = Intersection.includes(:roads_to, :roads_from).select do |node|
      n_x = lng_to_meters(node.lng)
      n_y = lat_to_meters(node.lat)

      distance({x: m_x, y: m_y}, {x: n_x, y: n_y}) < range + 15
    end

    all_nodes = self.nodes_to_obj(nodes_arr)
    seen = [start_node]
    visited = []

    loop do
      current_node = seen.shift
      visited.push(current_node)
      break if current_node.id == end_id

      current_node.roads.each_with_index do |road, i|
        next_id = road.intersection1_id == current_node.id ? road.intersection2_id : road.intersection1_id
        next_node = all_nodes[next_id]
        next if next_node == nil

        current_road = Road.map_user_prefs(road, current_node.elevation, next_node.elevation, user_prefs)
        new_weight = current_node.weight + road.weight
        if !seen.include?(next_node) && !visited.include?(next_node)

          next_node.weight = new_weight 
          next_node.node_from_id = current_node.id
          if seen.empty?
  
            seen.push(next_node)
          else
  
            seen.each_with_index do |node, i|
              if node.weight > next_node.weight
                seen.insert(i, next_node)
                break
              elsif (i == seen.length - 1)
                seen.push(next_node)
                break
              end
            end
          end
        else
          if !visited.include?(next_node) && new_weight < next_node.weight
            next_node.weight = new_weight
            next_node.node_from_id = current_node.id
          end

        end
      end
      
      p seen.length
    end

    current = visited.last
    path = []

    loop do
      path.unshift(current.id)
      current = all_nodes[current.node_from_id]
      break if current.node_from_id == nil
    end

    path.unshift(start_id)
  end
end
