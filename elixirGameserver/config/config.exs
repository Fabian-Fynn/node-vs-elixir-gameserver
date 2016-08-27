# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :elixirGameserver, ElixirGameserver.Endpoint,
  url: [host: "fhoffmann.mmt-b2013.multimediatechnology.at/elixir"],
  root: Path.dirname(__DIR__),
  secret_key_base: "KdvFRugXeHyiWaPJO1Ribp7OCjIWjDmCGvaNhQ4NontTZ1OaWdD/TEN+EnmpWOOb",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: ElixirGameserver.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "prod.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false
