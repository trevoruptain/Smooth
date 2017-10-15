class Api::IntersectionsController < ApplicationController
    
    def show_coordinates
        debugger
        end_lat = location_params[:endLat].to_f
        end_lng = location_params[:endLng].to_f
        
        closest_node = Intersection.snap_position(end_lat, end_lng)

        render json: closest_node
        
    end

    def location_params
        params.permit(:endLat, :endLng)
    end
end
