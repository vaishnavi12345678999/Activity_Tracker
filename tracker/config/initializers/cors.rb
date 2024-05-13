# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins '*'  # Allows all domains
      resource '/api/*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: false  # No credentials accepted
    end
  end
  