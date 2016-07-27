ExUnit.start

Mix.Task.run "ecto.create", ~w(-r ElixirGameserver.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r ElixirGameserver.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(ElixirGameserver.Repo)

