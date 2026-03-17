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
      date: event.date,
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
  @event = Event.find(params[:id])
  
  # 写真以外の項目を先に更新
  if @event.update(event_params.except(:photos))
    # 写真がある場合だけ、今の写真リストに「追加（attach）」する
    if params[:photos].present?
      @event.photos.attach(params[:photos])
    end
    render json: @event, status: :ok
  else
    render json: @event.errors, status: :unprocessable_entity
  end
end

# イベント詳細画面で削除するためのやつ
  def destroy
    event = Event.find(params[:id])
    if event.destroy
      render json: { message: "削除に成功しました" }, status: :ok
    else
      render json: { error: "削除に失敗しました" }, status: :unprocessable_entity
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
    params.permit(:title, :place, :memo, :date, photos: [], person_ids: [], remove_photo_ids: [])
  end
end