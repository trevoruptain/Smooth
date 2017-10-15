class Api::IntersectionsController < ApplicationController

    def show_coordinates
        end_lat = location_params[:endLat].to_f
        end_lng = location_params[:endLng].to_f
        p end_lat, end_lng

        debugger
    end

    def location_params
        params.permit(:endLat, :endLng)
    end
end
