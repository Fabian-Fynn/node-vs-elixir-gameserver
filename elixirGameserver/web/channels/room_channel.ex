defmodule ElixirGameserver.RoomChannel do
  use Phoenix.Channel
  alias ElixirGameserver.WorldController

  def join("rooms:game", message, socket) do
    id = pid_to_string(socket.channel_pid)
    WorldController.create_node(id)
    #send(self, :after_join)
    :ok = ChannelWatcher.monitor(:rooms, self(), {__MODULE__, :leave, [id]})
    {:ok, socket}
  end

  def leave(id) do
    WorldController.leave(id)
  end

  def handle_in("world_refresh", msg, socket) do
    socket_id = pid_to_string(socket.channel_pid)
    world_partial = WorldController.get_world_partial(socket_id)

    push socket, "world_update", %{body: world_partial, req_time: msg}
    {:noreply, socket}
  end

  def pid_to_string(pid) do
    to_string :erlang.pid_to_list(pid)
  end
end
