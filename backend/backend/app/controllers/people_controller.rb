class PeopleController < ApplicationController
  def index
    render json: Person.all
  end

  def show
  person = Person.find(params[:id])
  events = person.events

  render json: {
    person: person,
    events: events
  }
  end

  def create
    person = Person.new(person_params)
    if person.save
      render json: person
    else
      render json: { errors: person.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @person = Person.find(params[:id])
    if @person.update(person_params)
      render json: @person
    else
      render json: { errors: @person.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    Person.find(params[:id]).destroy
    head :no_content
  end

  private

  def person_params
    params.require(:person).permit(:name, :group, :mbti, :blood_type, :reliability, :other, :next_topic)
  end
end