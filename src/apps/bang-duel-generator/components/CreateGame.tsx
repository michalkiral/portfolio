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
        state: { player1: player1Trimmed, player2: player2Trimmed, player3: player3Trimmed },
      });
    }

    return;
  };

  const handlePlayerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(e.target.value);
  };

  const inputClass =
    "mt-1 rounded border border-white/20 bg-white/10 px-2 py-1 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/50";

  return (
    <div
      className="flex h-full min-h-full items-center justify-center bg-cover bg-center bg-no-repeat p-5 font-western tracking-widest"
      style={{ backgroundImage: `url(${woodPattern})` }}
    >
      <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-xl border-2 border-white/30 bg-black/70 p-8 shadow-2xl backdrop-blur-sm">
        <img src={img} alt="Bang! The Duel logo" className="w-40 rounded-lg" />

        <div className="flex flex-col items-center gap-2 text-white">
          <h2 className="text-lg font-semibold">Choose Player Count</h2>
          <div className="flex gap-6">
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
        </div>

        <div className="flex flex-col items-center gap-4 text-white sm:flex-row sm:gap-6">
          <div className="flex flex-col items-center">
            <label htmlFor="player1" className="mb-1 text-sm">
              Player 1
            </label>
            <input
              type="text"
              id="player1"
              name="player1"
              placeholder="Name"
              value={player1Input}
              onChange={(e) => setPlayer1Input(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="player2" className="mb-1 text-sm">
              Player 2
            </label>
            <input
              type="text"
              id="player2"
              name="player2"
              placeholder="Name"
              value={player2Input}
              onChange={(e) => setPlayer2Input(e.target.value)}
              className={inputClass}
            />
          </div>
          {playerCount === "3 Players" && (
            <div className="flex flex-col items-center">
              <label htmlFor="player3" className="mb-1 text-sm">
                Player 3
              </label>
              <input
                type="text"
                id="player3"
                name="player3"
                placeholder="Name"
                value={player3Input}
                onChange={(e) => setPlayer3Input(e.target.value)}
                className={inputClass}
              />
            </div>
          )}
        </div>

        {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

        <button
          type="button"
          onClick={createSession}
          className="rounded-lg border border-white/30 bg-white/10 px-6 py-2 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          Create a session
        </button>
      </div>
    </div>
  );
};

export default CreateGame;
