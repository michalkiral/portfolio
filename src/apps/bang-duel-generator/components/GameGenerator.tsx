import Button from "@/shared/components/Button";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Result {
  game: string;
  player1: string;
  player2: string;
  player3?: string;
  player1Generation: string;
  player2Generation: string;
  player3Generation?: string;
  winner: string;
  timestamp: string;
}

const GameGenerator: React.FC = () => {
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [player3, setPlayer3] = useState<string>("");
  const [game, setGame] = useState<string>("");
  const [player1Generation, setPlayer1Generation] = useState<string>("");
  const [player2Generation, setPlayer2Generation] = useState<string>("");
  const [player3Generation, setPlayer3Generation] = useState<string>("");
  const [selectedWinner, setSelectedWinner] = useState<string>("");
  const [results, setResults] = useState<Result[]>([]);

  const location = useLocation();
  const state = location.state as { player1: string; player2: string; player3?: string };
  const navigate = useNavigate();

  const generateRandomNumbers = useCallback((): string => {
    const length = game.includes("Reinforcements") ? 18 : 12;
    const numbers = Array.from({ length }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers
      .slice(0, 4)
      .sort((a, b) => a - b)
      .join(", ");
  }, [game]);

  const generateAnotherGame = useCallback(() => {
    const gameTypes = [
      "Reinforcements - Sheriffs vs Bandits",
      "Reinforcements - Bandits vs Sheriffs",
      "Sheriffs vs Bandits",
      "Sheriffs vs Renegades",
      "Bandits vs Sheriffs",
      "Bandits vs Renegades",
      "Renegades vs Sheriffs",
      "Renegades vs Bandits",
    ];

    const randomGameType = gameTypes[Math.floor(Math.random() * gameTypes.length)];
    const newP1 = generateRandomNumbers();
    const newP2 = generateRandomNumbers();
    const newP3 = state.player3 ? generateRandomNumbers() : "";

    setGame(randomGameType);
    setPlayer1Generation(newP1);
    setPlayer2Generation(newP2);
    setPlayer3Generation(state.player3 ? newP3 : "");
    setSelectedWinner("");

    saveToLocalStorage("generatedData", {
      game: randomGameType,
      player1Generation: newP1,
      player2Generation: newP2,
      player3Generation: state.player3 ? newP3 : "",
    });

    document.querySelectorAll('input[name="winner"]').forEach((radio) => {
      (radio as HTMLInputElement).checked = false;
    });
  }, [generateRandomNumbers, state.player3]);

  useEffect(() => {
    setPlayer1(state.player1 || "Unknown Player 1");
    setPlayer2(state.player2 || "Unknown Player 2");
    setPlayer3(state.player3 || "Unknown Player 3");

    const savedResults = localStorage.getItem("gameResults");
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }

    const savedGeneratedData = localStorage.getItem("generatedData");
    if (savedGeneratedData) {
      const data = JSON.parse(savedGeneratedData);
      setGame(data.game);
      setPlayer1Generation(data.player1Generation);
      setPlayer2Generation(data.player2Generation);
      setPlayer3Generation(data.player3Generation);
    } else {
      generateAnotherGame();
    }
  }, [state, generateAnotherGame]);

  const saveToLocalStorage = (key: string, data: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save to localStorage with key "${key}":`, error);
    }
  };

  const handleWinnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWinner(e.target.value);
  };

  const saveCurrentResult = (timestamp: string) => {
    if (selectedWinner) {
      const newResult: Result = {
        game,
        player1,
        player2,
        player3: player3 !== "Unknown Player 3" ? player3 : undefined,
        player1Generation,
        player2Generation,
        player3Generation: player3 !== "Unknown Player 3" ? player3Generation : undefined,
        winner: selectedWinner,
        timestamp,
      };
      setResults((prev) => {
        const updated = [...prev, newResult];
        saveToLocalStorage("gameResults", updated);
        return updated;
      });
    }
  };

  const endSession = () => {
    if (results.length === 0) {
      navigate("/");
      return;
    }

    const timestamp = new Date().toISOString();
    saveCurrentResult(timestamp);

    const blob = new Blob([JSON.stringify(results, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `game-results-${timestamp}.json`;
    a.click();
    URL.revokeObjectURL(url);

    localStorage.removeItem("gameResults");
    localStorage.removeItem("generatedData");
    setResults([]);
    navigate("/");
  };

  const reloadPage = () => {
    const timestamp = new Date().toISOString();
    saveCurrentResult(timestamp);
    generateAnotherGame();
  };

  const isThreePlayer = player3 !== "Unknown Player 3";

  return (
    <div className="flex w-full max-w-md flex-col gap-6 rounded-xl bg-surface-container-low p-8">
      <h2 className="text-center text-xl font-bold text-on-surface">Current Game</h2>

      <div className="rounded-lg bg-surface-container p-4 text-center">
        <p className="text-xs uppercase tracking-widest text-on-surface-variant">Game Type</p>
        <p className="mt-1 font-semibold text-on-surface">{game}</p>
      </div>

      <div className={`grid gap-3 ${isThreePlayer ? "grid-cols-3" : "grid-cols-2"}`}>
        {[
          { name: player1, cards: player1Generation },
          { name: player2, cards: player2Generation },
          ...(isThreePlayer ? [{ name: player3, cards: player3Generation }] : []),
        ].map(({ name, cards }) => (
          <div key={name} className="rounded-lg bg-surface-container p-3 text-center">
            <p className="text-xs font-semibold text-on-surface-variant">{name}</p>
            <p className="mt-1 text-sm text-on-surface">{cards}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-center text-sm text-on-surface-variant">Choose the winner</p>
        {[
          { key: "player1", name: player1 },
          { key: "player2", name: player2 },
          ...(isThreePlayer ? [{ key: "player3", name: player3 }] : []),
        ].map(({ key, name }) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-outline-variant/15 px-4 py-2 transition-colors hover:bg-surface-container-high has-[:checked]:border-primary/50 has-[:checked]:bg-surface-container-high"
          >
            <input
              type="radio"
              name="winner"
              value={key}
              onChange={handleWinnerChange}
              checked={selectedWinner === key}
              className="accent-primary"
            />
            <span className="text-on-surface">{name}</span>
          </label>
        ))}
        {!selectedWinner && (
          <p className="text-center text-xs text-red-400">Select a winner to continue</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          onClick={reloadPage}
          disabled={!selectedWinner}
          className="flex-1"
        >
          Next game
        </Button>
        <Button variant="secondary" onClick={endSession} className="flex-1">
          End session
        </Button>
      </div>
    </div>
  );
};

export default GameGenerator;
