defmodule EventsApp.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date, :string
    field :description, :string
    field :name, :string

    belongs_to :user, EventsApp.Users.User

    has_many :comments, EventsApp.Comments.Comment
    has_many :invites, EventsApp.Invites.Invite
    has_many :responses, EventsApp.Responses.Response

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:name, :date, :description, :user_id])
    |> validate_required([:name, :date, :description, :user_id])
  end
end
