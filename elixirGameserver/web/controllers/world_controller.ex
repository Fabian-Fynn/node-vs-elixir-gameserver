defmodule ElixirGameserver.WorldController do
  use ElixirGameserver.Web, :controller

  def get_settings() do
    settings = %{
      field_size: 200
    }
  end

  def create_node(id) do
    NodeBucket.start_link
    pos = random_position()
    node = %{id: id, x: pos.x, y: pos.y, size: 1}
    NodeBucket.put(Nodes, id, node)
  end

  def leave(id) do
    NodeBucket.remove(Nodes, id)
  end

  def get_node(id) do
    NodeBucket.get(Nodes, id)
  end

  def random_position() do
    field_size = get_settings().field_size
    x = ran_int(field_size)
    y = ran_int(field_size)
    pos = %{x: x, y: y}

    if is_occupied?(pos) do
      random_position()
    else
      pos
    end
  end

  def ran_int(n) when is_integer(n) do
    :random.seed(:erlang.now)
    :random.uniform(n + 1) - 1
  end

  def is_occupied?(pos) do
    nodes = NodeBucket.get(Nodes)
    occupied = false

    Enum.any?(nodes, fn(key) ->
      node =  List.last(Tuple.to_list(key))
      node.x === pos.x and node.y === pos.y
    end)
  end

  def get_world_partial(node_id) do
    other_nodes = get_other_nodes(node_id)
    own_node = NodeBucket.get(Nodes, node_id)

    nodes_in_range = for n <- other_nodes, is_in_range?(n, own_node), do: n
    List.insert_at(nodes_in_range, 0, own_node)
  end

  def get_other_nodes(node_id) do
    own_node = NodeBucket.get(Nodes, node_id)
    all_nodes = NodeBucket.get(Nodes)

    for x <- all_nodes, List.last(Tuple.to_list(x)) !== own_node, do: List.last(Tuple.to_list(x))
  end

  def is_in_range?(other_node, current_node) do
    horizontal_range = other_node.size * 160 / 2
    vertical_range = other_node.size * 90 / 2

    horizontal_distance = abs(other_node.x - current_node.x) - other_node.size / 2
    vertical_distance = abs(other_node.y - current_node.y) - other_node.size / 2

    horizontal_distance < horizontal_range && vertical_distance < vertical_range
  end
end
