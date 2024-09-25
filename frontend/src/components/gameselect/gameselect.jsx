import { useState } from "react";
import "./gameselect.css";

function GameSelect({ gameId, setGameId, games, setGames }) {
  const [fetchError, setFetchError] = useState(null);

  return (
    <div className="selection-container">
      <fieldset className="game-select-section">
        <legend htmlFor="games-list">Select a Game</legend>
        <select
          id="games-list"
          name="game-list"
          onChange={(e) => setGameId(e.target.value)}
          value={gameId}
        >
          <option value="">--No Game Selected--</option>
          {games &&
            games.length > 0 &&
            games.map((game) => (
              <option key={game.game_id} value={game.game_id}>
                {game.game_id}
              </option>
            ))}
        </select>
      </fieldset>
      {fetchError && <p className="error-message">{fetchError}</p>}
      {/* <div className="game-import-section">
          <label htmlFor="game-import">Import Data</label>
          <input
            name="game-import"
            id="game-import"
            type="file"
            onClick={(e) => setGameFile(e.target.value)}
          />
          <button className="import-button">Import Game</button>
        </div>
        */}
    </div>
  );
}

export default GameSelect;
