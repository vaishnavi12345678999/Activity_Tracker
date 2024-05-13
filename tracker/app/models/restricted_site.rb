class RestrictedSite < ApplicationRecord
    belongs_to :user
    validates :hostname, presence: true, uniqueness: { scope: :user_id }
  end
  