import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import woodPattern from "../assets/wood-pattern.png";

type CreateGameProps = {
  img: string;
};

const CreateGame: React.FC<CreateGameProps> = ({ img }) => {
  const [player1Input, setPlayer1Input] = useState("");
  const [player2Input, setPlayer2Input] = useState("");
  const [player3Input, setPlayer3Input] = useState("");
  const [playerCount, setPlayerCount] = useState("2 Players");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const createSession = () => {
    const player1Trimmed = player1Input.trim();
    const player2Trimmed = player2Input.trim();
    const player3Trimmed = player3Input.trim();

    if (playerCount === "2 Players") {
      if (!player1Trimmed || !player2Trimmed) {
        setErrorMessage("Please fill out both player names.");
        return;
      }

      setErrorMessage("");
      navigate("/bangtheduelgenerator/game-generator", {
        state: { player1: player1Trimmed, player2: player2Trimmed },
      });
    } else if (playerCount === "3 Players") {
      if (!player1Trimmed || !player2Trimmed || !player3Trimmed) {
        setErrorMessage("Please fill out all three player names.");
        return;
      }

      setErrorMessage("");
      navigate("/bangtheduelgenerator/game-generator", {
        state: {
          player1: player1Trimmed,
          player2: player2Trimmed,
          player3: player3Trimmed,
        },
      });
    }

    return;
  };

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(e.target.value);
  };

  return (
    <div
      className="flex flex-1 items-center justify-center bg-cover bg-center bg-no-repeat p-5 font-western tracking-widest text-white/90 [color-scheme:light_dark]"
      style={{ backgroundImage: `url(${woodPattern})` }}
    >
      <div className="box-border flex min-h-[400px] w-[90%] max-w-[600px] flex-col items-center justify-around rounded-lg border-[3px] border-white bg-[#242424] p-4">
        <div className="mt-5 flex w-1/4 max-w-[150px] items-center justify-center rounded-lg bg-white">
          <img src={img} alt="Game Logo" className="h-auto w-full rounded-lg object-contain" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold">Choose Player Count</h2>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="playerCount"
              value="2 Players"
              onChange={handlePlayerCountChange}
              checked={playerCount === "2 Players"}
            />
            2 Players
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="playerCount"
              value="3 Players"
              onChange={handlePlayerCountChange}
              checked={playerCount === "3 Players"}
            />
            3 Players
          </label>
        </div>

        <div className="flex flex-col items-center gap-5 md:flex-row">
          <div className="flex flex-col items-center">
            <label htmlFor="player1">Player 1</label>
            <input
              type="text"
              id="player1"
              name="player1"
              placeholder="Name"
              value={player1Input}
              onChange={(e) => setPlayer1Input(e.target.value)}
              className="mt-1 rounded border border-black p-1 text-black"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="player2">Player 2</label>
            <input
              type="text"
              id="player2"
              name="player2"
              placeholder="Name"
              value={player2Input}
              onChange={(e) => setPlayer2Input(e.target.value)}
              className="mt-1 rounded border border-black p-1 text-black"
            />
          </div>
          {playerCount === "3 Players" && (
            <div className="flex flex-col items-center">
              <label htmlFor="player3">Player 3</label>
              <input
                type="text"
                id="player3"
                name="player3"
                placeholder="Name"
                value={player3Input}
                onChange={(e) => setPlayer3Input(e.target.value)}
                className="mt-1 rounded border border-black p-1 text-black"
              />
            </div>
          )}
        </div>

        {errorMessage && <div className="text-red-400">{errorMessage}</div>}

        <button
          type="button"
          onClick={createSession}
          className="cursor-pointer rounded-lg border border-transparent bg-[#1a1a1a] px-5 py-2 font-medium transition-colors hover:border-[#646cff] focus-visible:outline-4 focus-visible:outline-auto"
        >
          Create a session
        </button>
      </div>
    </div>
  );
};

export default CreateGame;
