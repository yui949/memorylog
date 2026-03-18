class Event < ApplicationRecord
  has_many :event_people, dependent: :destroy
  has_many :people, through: :event_people
  has_many_attached :photos
end
