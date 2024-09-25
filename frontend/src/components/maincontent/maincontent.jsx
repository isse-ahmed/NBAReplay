import { useCallback, useState } from "react";
import { useEffect } from "react";
import "./maincontent.css";
import GameInfo from "./../gameinfo/gameinfo.jsx";
import GameSelect from "./../gameselect/gameselect.jsx";
import DeviceSelect from "./../deviceselect/deviceselect.jsx";

function MainContent() {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [gameId, setGameId] = useState("");
  const [gameFile, setGameFile] = useState(null);
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState("Start");

  //Fetch all the games in the database using the backend api
  useEffect(() => {
    fetch("http://localhost:3010/api/nba/games")
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! status: " + response.status);
        }
        return response.json();
      })
      .then((json) => setGames(json))
      .catch((error) => console.log("Error getting games : " + error.message));
  }, []);

  //Poll backend to check if game is in progres
  useEffect(() => {
    const pollStatus = setInterval(() => {
      fetch("http://localhost:3010/api/nba/status")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Http error! status : " + response.status);
          }
          return response.json();
        })
        .then((json) => {
          if (json.status === "idle") {
            setStatus("Start");
          } else {
            setStatus(json.status);
          }
        })
        .catch((error) =>
          console.log("Error polling for game status : " + error.message)
        );
    }, 5000);

    return () => clearInterval(pollStatus);
  }, []);

  const startGame = useCallback(async () => {
    if (apiEndpoint.trim() === "" || gameId === "" || status === "in-progress")
      return;

    try {
      const response = await fetch(
        `http://localhost:3010/api/nba/start/${gameId}?url=${encodeURIComponent(
          apiEndpoint
        )}`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("HTTP Error! status : " + response.status);
      }

      setStatus("in-progress");
    } catch (error) {
      console.log("Error starting game : " + error);
    }
  }, [gameId, apiEndpoint, status]);

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
          <GameSelect
            gameId={gameId}
            setGameId={setGameId}
            games={games}
            setGames={setGames}
          />
        </div>
        <div>
          <GameInfo gameId={gameId} games={games} />
        </div>
        <div className="button-container">
          <button
            className="start-game"
            onClick={() => {
              startGame();
            }}
          >
            {status}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
