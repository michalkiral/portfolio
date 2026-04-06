import ResultReveal from "@/apps/randomizer/components/ResultReveal";
import type { Entry } from "@/apps/randomizer/types";
import React, { useState } from "react";

type TeamGeneratorProps = {
  entries: Entry[];
};

function shuffle<T>(arr: T[]): T[] {
  const next = [...arr];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function makeTeams(entries: Entry[], teamCount: number): Entry[][] {
  const shuffled = shuffle(entries);
  const teams: Entry[][] = Array.from({ length: teamCount }, () => []);
  for (let i = 0; i < shuffled.length; i++) {
    teams[i % teamCount].push(shuffled[i]);
  }
  return teams;
}

const TeamGenerator: React.FC<TeamGeneratorProps> = ({ entries }) => {
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<Entry[][]>([]);
  const [rolling, setRolling] = useState(false);
  const [version, setVersion] = useState(0);

  const maxTeams = Math.min(10, entries.length);

  const generate = () => {
    if (entries.length < 2 || rolling) return;
    setRolling(true);
    setTeams([]);
    setTimeout(() => {
      setTeams(makeTeams(entries, teamCount));
      setVersion((v) => v + 1);
      setRolling(false);
    }, 500);
  };

  if (entries.length < 2) {
    return (
      <p className="text-body-md text-on-surface-variant">
        Add at least 2 entries to generate teams.
      </p>
    );
  }

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="text-label-md uppercase tracking-widest text-on-surface-variant">
          Teams
        </span>
        <button
          type="button"
          onClick={() => setTeamCount((c) => Math.max(2, c - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface"
        >
          −
        </button>
        <span className="w-6 text-center text-body-md text-on-surface">{teamCount}</span>
        <button
          type="button"
          onClick={() => setTeamCount((c) => Math.min(maxTeams, c + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={generate}
        disabled={rolling}
        className="rounded-lg bg-gradient-to-r from-primary to-primary-container px-6 py-2.5 text-label-md font-medium uppercase tracking-widest text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {rolling ? "Sorting…" : "Generate Teams"}
      </button>

      {teams.length > 0 && (
        <ResultReveal resultKey={version} onRedo={generate}>
          <div className="flex flex-col gap-3">
            {teams.map((team, idx) => (
              <div key={idx} className="rounded-lg bg-surface-container px-4 py-3">
                <p className="mb-2 text-label-md uppercase tracking-widest text-on-surface-variant">
                  Team {idx + 1}
                </p>
                <div className="flex flex-wrap gap-2">
                  {team.map((entry) => (
                    <span
                      key={entry.id}
                      className="rounded-md bg-surface-container-high px-2 py-0.5 text-body-md text-on-surface"
                    >
                      {entry.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ResultReveal>
      )}
    </div>
  );
};

export default TeamGenerator;
