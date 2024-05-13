module Api
    class ActivitiesController < ApplicationController
      before_action :authenticate_user
  

      def index
        activities = current_user.activities
        render json: activities, status: :ok
      end
    

      def create
        Activity.transaction do
          activity_params.each do |activity_data|
            # Attempt to find an existing activity
            activity = current_user.activities.find_by(url: activity_data[:url], date: activity_data[:date])
      
            if activity
              # If found, update the time spent
              activity.time_spent += activity_data[:time_spent]
            else
              # If not found, initialize a new activity with all necessary data
              activity = current_user.activities.new(activity_data)
            end
      
            # Save and handle failure
            unless activity.save
              Rails.logger.debug "Failed to save activity: #{activity.errors.full_messages.join(', ')}"
              render json: { errors: activity.errors.full_messages }, status: :unprocessable_entity
              raise ActiveRecord::Rollback # This will stop the transaction
            end
          end
        end
        render json: { message: 'Activities recorded successfully' }, status: :created
      rescue => e
        Rails.logger.debug "Exception caught: #{e.message}"
        render json: { error: e.message }, status: :unprocessable_entity
      end
      
  
      private
  
      def activity_params
        params.require(:activities).map do |activity|
          activity.permit(:hostname, :url, :time_spent, :date)
        end
      end
    end
  end
  