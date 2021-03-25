# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventsApp.Repo.insert!(%EventsApp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EventsApp.Repo
alias EventsApp.Users.User
alias EventsApp.Events.Event

defmodule Inject do
  def user(name, email, pass) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

alice = Inject.user("alice", "alice@gmail.com", "password")
bob = Inject.user("bob", "bob@gmail.com", "password2")

ev1 = %Event{
  user_id: alice.id, name: "Birthday", date: "04/29/21", description: "Fun"
}

ev2 = %Event{
  user_id: bob.id, name: "Birthday2", date: "04/30/21", description: "fun"
}

Repo.insert!(ev1)
Repo.insert!(ev2)
