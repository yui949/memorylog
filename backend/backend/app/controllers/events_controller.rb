class EventsController < ApplicationController

  def index
    events = Event.all
    render json: events
  end

  def show
    event = Event.includes(:people).find(params[:id])
    render json: event.to_json(include: :people)
  end

  def update
  event = Event.find(params[:id])

  if event.update(event_params)

    if params[:people_ids]
      event.event_people.destroy_all

      params[:people_ids].each do |person_id|
        EventPerson.create(
          event_id: event.id,
          person_id: person_id
        )
      end
    end

    render json: event.to_json(include: :people)

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
    params.permit(:title, :place)
  end

end