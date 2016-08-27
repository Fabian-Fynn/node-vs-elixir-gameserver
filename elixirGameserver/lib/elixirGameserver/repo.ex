defmodule ElixirGameserver.Repo do
  use Ecto.Repo, otp_app: :elixirGameserver,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "my_app_dev",
  pool_size: 10
end
