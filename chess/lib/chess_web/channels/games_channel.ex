defmodule ChessWeb.GamesChannel do
  use ChessWeb, :channel

  alias Chess.Game

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Chess.GameBackup.load(name) || Game.newGame()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("move", %{ "oldLocation" => oldLocation, "newLocation" => newLocation, "piece" => piece }, socket) do
    game = Game.move(socket.assigns[:game], move)
    Chess.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end