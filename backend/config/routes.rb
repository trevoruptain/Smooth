Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Doesn't work, why?
  # get 'api/intersections?endLat=:endLat&endLng=:endLng', to: 'api/intersections#show', defaults: {format: :json}

  post 'api/intersections', to: 'api/intersections#show_coordinates', defaults: {format: :json}
end
