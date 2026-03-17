class EventsController < ApplicationController
  include Rails.application.routes.url_helpers

  def index
    events = Event.all
    render json: events
  end

  def show
    event = Event.find(params[:id])

    render json: {
      id: event.id,
      title: event.title,
      place: event.place,
      memo: event.memo,
      people: event.people,
      photos: event.photos.map { |p|
        {
          id: p.id,
          url: url_for(p)
        }
      }
    }
  end

  def update
    event = Event.find(params[:id])

    # 🔥 画像削除
    if params[:remove_photo_ids]
      params[:remove_photo_ids].each do |photo_id|
        photo = event.photos.find(photo_id)
        photo.purge
      end
    end

    if event.update(event_params)
      render json: event
    else
      render json: event.errors, status: 422
    end
  end

  def create
    event = Event.new(event_params)

    if event.save
      if params[:people_ids]
        params[:people_ids].each do |person_id|
          EventPerson.create(
            event_id: event.id,
            person_id: person_id
          )
        end
      end

      render json: event
    else
      render json: event.errors, status: 422
    end
  end

  private

  def event_params
    params.permit(:title, :place, :memo, photos: [], people_ids: [])
  end
end