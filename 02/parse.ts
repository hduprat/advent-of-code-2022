import { Move, Round, RoundStrategy, Strategy } from "./types.ts";

const opponentMoveMap: Record<string, Move> = {
  A: "🪨",
  B: "📄",
  C: "✂️",
};

const youMoveMap: Record<string, Move> = {
  X: "🪨",
  Y: "📄",
  Z: "✂️",
};

const strategyMap: Record<string, Strategy> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

export const parseFile = (file: string[]): Round[] => {
  return file.map((line) => {
    const [opponentLetter, youLetter] = line.split(" ");

    if (!(opponentLetter in opponentMoveMap)) {
      throw new Error("Undefined opponent move");
    }

    if (!(youLetter in youMoveMap)) {
      throw new Error("Undefined move from you");
    }

    return {
      opponent: opponentMoveMap[opponentLetter],
      you: youMoveMap[youLetter],
    };
  });
};

export const parseFileForStrategy = (file: string[]): RoundStrategy[] => {
  return file.map((line) => {
    const [opponentLetter, youLetter] = line.split(" ");

    if (!(opponentLetter in opponentMoveMap)) {
      throw new Error("Undefined opponent move");
    }

    if (!(youLetter in strategyMap)) {
      throw new Error("Undefined strategy from you");
    }

    return {
      opponent: opponentMoveMap[opponentLetter],
      strategy: strategyMap[youLetter],
    };
  });
};
