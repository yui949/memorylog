class Person < ApplicationRecord
  has_many :event_people, dependent: :destroy
  has_many :events, through: :event_people
end