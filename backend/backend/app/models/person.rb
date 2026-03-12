class Person < ApplicationRecord
  has_many :event_people
  has_many :events, through: :event_people
end