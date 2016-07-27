defmodule ElixirGameserver.PageController do
  use ElixirGameserver.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
