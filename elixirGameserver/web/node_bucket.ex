defmodule NodeBucket do
  def start_link() do
    Agent.start_link(fn -> %{} end, name: Nodes)
  end
  
  def get(bucket, key) do
    Agent.get(bucket, &Map.get(&1, key))
  end
  
  def get(bucket) do
    Agent.get(bucket, fn node ->
      node
    end )
  end
  
  def put(bucket, key, value) do
    Agent.update(bucket, &Map.put(&1, key, value))
  end
  
  def update(bucket, key, value) do
    Agent.update(Nodes, bucket, key, value)
  end
  
  def remove(bucket, key) do
    Agent.update(bucket, &Map.delete(&1, key))
  end
end
