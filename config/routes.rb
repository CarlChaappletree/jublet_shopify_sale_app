Rails.application.routes.draw do
  require 'sidekiq/web'

  #Stripe: webhook. source: https://youtu.be/oYSLhriIZaA
  post '/webhook', to: 'webhook_events#create'

  mount Sidekiq::Web, at: "/sidekiq/stats"

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  mount ShopifyApp::Engine, at: '/'

  # to mount react comp
  # resource: https://www.freecodecamp.org/news/how-to-create-a-rails-project-with-a-react-and-redux-front-end-8b01e17a1db/
  get '*page', to: 'home#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root 'home#index'
end
