class Activity < ApplicationRecord
  belongs_to :user

  # Validations to ensure data integrity
  validates :hostname, presence: true
  validates :url, presence: true
  validates :time_spent, numericality: { greater_than_or_equal_to: 0 }
  validates :date, presence: true
end
