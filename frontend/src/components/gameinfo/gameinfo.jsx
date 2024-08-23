import "./gameinfo.css";

function GameInfo({ gameId, setGameId }) {
  return (
    <div className="game-info">
      <h3 className="game-info-text">No Game Selected</h3>
      <h5 className="game-info-text game-info-date">No Game Selected</h5>
    </div>
  );
}

export default GameInfo;
