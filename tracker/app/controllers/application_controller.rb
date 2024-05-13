# class ApplicationController < ActionController::Base
# end

# app/controllers/application_controller.rb

class ApplicationController < ActionController::API
    def preflight
      render json: {}, status: :no_content
    end

    def authenticate_user
        token = request.headers['Authorization']&.split(' ')&.last
        # Run secret_key_generator ruby file and get a random key and place in ENV or replace that here for development environment (Prerequisite)
        decoded_token = JWT.decode(token, Rails.application.credentials.jwt_secret_key, true, { algorithm: 'HS256' }) 
        @current_user = User.find(decoded_token[0]['user_id'])
      rescue JWT::DecodeError
        render json: { error: 'Invalid token' }, status: :unauthorized
      end
    
    def current_user
        @current_user
    end
  end
  
