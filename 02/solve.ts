import { mapSum } from "../utils/array.ts";
import { Move, Round, RoundStrategy, Strategy } from "./types.ts";

const moveScoreMap: Record<Move, number> = {
  "🪨": 1,
  "📄": 2,
  "✂️": 3,
};

const moveOutcomeMap: Record<Move, Record<Move, number>> = {
  "🪨": {
    "🪨": 3,
    "📄": 0,
    "✂️": 6,
  },
  "📄": {
    "🪨": 6,
    "📄": 3,
    "✂️": 0,
  },
  "✂️": {
    "🪨": 0,
    "📄": 6,
    "✂️": 3,
  },
};

const strategyMoveMap: Record<Strategy, Record<Move, Move>> = {
  win: {
    "🪨": "📄",
    "📄": "✂️",
    "✂️": "🪨",
  },
  draw: {
    "🪨": "🪨",
    "📄": "📄",
    "✂️": "✂️",
  },
  lose: {
    "🪨": "✂️",
    "📄": "🪨",
    "✂️": "📄",
  },
};

const computeRoundScore = ({ you, opponent }: Round): number => {
  const moveScore = moveScoreMap[you] ?? 0;
  const outcomeScore = moveOutcomeMap[you]?.[opponent] ?? 0;

  return moveScore + outcomeScore;
};

export const solveProblem1 = (data: Round[]): number =>
  mapSum(data, computeRoundScore);

export const solveProblem2 = (data: RoundStrategy[]): number =>
  mapSum(data, ({ opponent, strategy }) => {
    const you = strategyMoveMap[strategy][opponent];

    return computeRoundScore({ you, opponent });
  });
