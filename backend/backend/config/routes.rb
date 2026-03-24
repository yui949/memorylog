Rails.application.routes.draw do
  root to: proc { [200, {}, ["OK"]] }

  resources :events
  resources :people
end