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

require 'test_helper'

class RoadTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
