import { Direction, Move } from "./types.ts";

const directionMap: Record<string, Direction> = {
  R: "right",
  D: "down",
  L: "left",
  U: "up",
};

export const parseFile = (file: string[]): Move[] => {
  return file.map((line) => {
    const [rawDir, rawCount] = line.split(" ");
    if (!(rawDir in directionMap)) throw new Error("Illegal direction");
    return {
      direction: directionMap[rawDir],
      stepCount: Number(rawCount),
    };
  });
};
