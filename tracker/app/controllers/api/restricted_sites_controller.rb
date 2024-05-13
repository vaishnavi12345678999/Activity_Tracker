module Api
  class RestrictedSitesController < ApplicationController
    before_action :authenticate_user

    def index
      restricted_sites = current_user.restricted_sites
      render json: restricted_sites, status: :ok
    end

    def create
      Rails.logger.debug "Restricted site hit with hostname: #{params[:hostname]}"
      restricted_site = current_user.restricted_sites.build(hostname: params[:hostname])
      if restricted_site.save
        render json: { message: "Site restricted successfully.", hostname: restricted_site.hostname }, status: :created
      else
        render json: { errors: restricted_site.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      restricted_site = current_user.restricted_sites.find_by(hostname: params[:hostname])
      if restricted_site && restricted_site.destroy
        head :no_content
      else
        render json: { error: "Restricted site not found or could not be deleted." }, status: :unprocessable_entity
      end
    end
  end
end