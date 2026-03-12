class PeopleController < ApplicationController
  def index
    people = Person.all
    render json: people
  end

  def show
  person = Person.find(params[:id])
  render json: person
  end

  def create
    person = Person.new(person_params)

    if person.save
      render json: person
    else
      render json: { errors: person.errors }, status: :unprocessable_entity
    end
  end

  private

  def person_params
    params.require(:person).permit(:name, :memo)
  end

  
end