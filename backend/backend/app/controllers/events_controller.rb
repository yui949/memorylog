class EventsController < ApplicationController

  def index
    events = Event.all
    render json: events
  end

  def show
    event = Event.includes(:people).find(params[:id])
    render json: event.to_json(include: :people)
  end

end