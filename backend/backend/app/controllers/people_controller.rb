class PeopleController < ApplicationController
  def index
    people = Person.all
    render json: people
  end

  def show
  person = Person.find(params[:id])

  render json: person.as_json(include: {
    events: {
      only: [:id, :title, :date, :place]
    }
  })
  end

  def create
    person = Person.new(person_params)

    if person.save
  render json: person
else
  render json: { errors: person.errors.full_messages }, status: :unprocessable_entity
end
  end

  def destroy
  person = Person.find(params[:id])
  person.destroy
  head :no_content
end

  private

  def person_params
  params.require(:person).permit(
    :name,
    :group,
    :mbti,
    :blood_type,
    :reliability,
    :other
  )
  end

  
end