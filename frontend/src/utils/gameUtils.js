export const findSelectedGame = (gameId, games) => {
  return games.find((game) => game.game_id == gameId);
};
