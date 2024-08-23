import { useState } from "react";
import "./maincontent.css";
import GameInfo from "./../gameinfo/gameinfo.jsx";
import GameSelect from "./../gameselect/gameselect.jsx";
import DeviceSelect from "./../deviceselect/deviceselect.jsx";

function MainContent() {
  const [apiEndpoint, setApiEndpoint] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [gameFile, setGameFile] = useState(null);

  return (
    <div>
      <div className="main-container">
        <div>
          <DeviceSelect
            apiEndpoint={apiEndpoint}
            setApiEndpoint={setApiEndpoint}
          />
        </div>
        <div>
          <div className="game-info">
            <p className="game-info-text">No Game Selected</p>
            <p className="game-info-text game-info-date">No Game Selected</p>
          </div>
        </div>
        <div>
          <GameSelect
            gameId={gameId}
            setGameId={setGameId}
            gameFile={gameFile}
            setGameFile={setGameFile}
          />
        </div>
      </div>
      <div className="button-container">
        <button
          className="start-game"
          onClick={() => console.log(`${apiEndpoint} and`)}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default MainContent;
