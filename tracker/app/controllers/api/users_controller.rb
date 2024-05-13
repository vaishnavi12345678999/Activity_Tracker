require 'jwt'

module Api
    class UsersController < ApplicationController


      def create
        existing_user = User.find_by(email: user_params[:email])
        if existing_user
          render json: { error: 'Email is already in use' }, status: :unprocessable_entity
        else
          user = User.new(user_params)
          if user.save
            render json: { status: 'User created successfully' }, status: :created
          else
            render json: { errors: user.errors.full_messages }, status: :bad_request
          end
        end
      end
  
      def login
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
          token = generate_token(user)
          render json: { token: token }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
  
      private
  
      def generate_token(user)
        # Assuming you have a method to generate JWT token
        payload = {
            user_id: user.id,
            exp: 24.hours.from_now.to_i
        }
        JWT.encode(payload, Rails.application.credentials.jwt_secret_key)
      end

      private
  
      def user_params
        params.require(:user).permit(:email, :password)
      end
    end
  end