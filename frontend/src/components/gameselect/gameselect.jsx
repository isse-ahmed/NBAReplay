import "./gameselect.css";

function GameSelect({ gameId, setGameId, gameFile, setGameFile }) {
  return (
    <div className="rounded-container">
      <div className="selection-container">
        <div className="game-select-section">
          <label htmlFor="games-list">Select a Game to Replay</label>
          <select
            id="games-list"
            name="game-list"
            onChange={(e) => setGameId(e.target.value)}
          >
            <option value="">--No Game Selected--</option>
          </select>
        </div>
        <div className="game-import-section">
          <label htmlFor="game-import">Import Data</label>
          <input
            name="game-import"
            id="game-import"
            type="file"
            onClick={(e) => setGameFile(e.target.value)}
          />
          <button className="import-button">Import Game</button>
        </div>
      </div>
    </div>
  );
}

export default GameSelect;
