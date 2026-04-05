import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
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

  return (
    <div
      className="flex h-full min-h-full items-center justify-center bg-cover bg-center bg-no-repeat p-5 font-western tracking-widest"
      style={{ backgroundImage: `url(${woodPattern})` }}
    >
      <div className="flex w-full max-w-lg flex-col items-center gap-6 rounded-xl border border-outline-variant/15 bg-surface-container/60 p-8 backdrop-blur-md">
        <img src={img} alt="Bang! The Duel logo" className="w-40 rounded-lg" />

        <div className="flex flex-col items-center gap-2 text-on-surface">
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

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Input
            label="Player 1"
            placeholder="Name"
            value={player1Input}
            onChange={(e) => setPlayer1Input(e.target.value)}
          />
          <Input
            label="Player 2"
            placeholder="Name"
            value={player2Input}
            onChange={(e) => setPlayer2Input(e.target.value)}
          />
          {playerCount === "3 Players" && (
            <Input
              label="Player 3"
              placeholder="Name"
              value={player3Input}
              onChange={(e) => setPlayer3Input(e.target.value)}
            />
          )}
        </div>

        {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

        <Button variant="primary" onClick={createSession}>
          Create a session
        </Button>
      </div>
    </div>
  );
};

export default CreateGame;
