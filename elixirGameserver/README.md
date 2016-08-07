# ElixirGameserver

## Setup

### Elixir
  Install elixir:

    $ apt-get install elixir

  Install elixir's packet manager:
  
    $ mix local.hex
    
  Install Erlang:
  
    $ wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
    
    $ sudo apt-get update
    $ sudo apt-get install esl-erlang
    
    
To start your Phoenix app:

  1. Install dependencies with `mix deps.get`
  2. Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  3. Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](http://www.phoenixframework.org/docs/deployment).
