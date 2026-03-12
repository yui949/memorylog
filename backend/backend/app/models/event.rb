class Event < ApplicationRecord
  has_many :event_people
  has_many :people, through: :event_people
end
