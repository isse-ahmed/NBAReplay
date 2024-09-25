import "./gameinfo.css";
import { findSelectedGame } from "../../utils/gameUtils";

function GameInfo({ gameId, games }) {
  //Displaying Game Info depending if game is selected
  if (!gameId) {
    return (
      <>
        <p className="game-info-text">No Game Selected</p>
        <p className="game-info-text game-info-date">No Game Selected</p>
      </>
    );
  }

  const selectedGame = findSelectedGame(gameId, games);

  if (!selectedGame) {
    return <p className="game-info-text">Loading game information...</p>;
  }

  return (
    <>
      <div className="game-info">
        <p className="game-info-text">Selected Game: {selectedGame.game_id}</p>
        <p className="game-info-text game-info-date">
          Game Date: {selectedGame.game_date}
        </p>
      </div>
    </>
  );
}

export default GameInfo;
