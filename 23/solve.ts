import { ElfMap } from "./ElfMap.ts";

export const solveProblem1 = (data: ElfMap): number => {
  data.moveUntil(10);
  return data.emptySpaces;
};

export const solveProblem2 = (data: ElfMap): number => {
  data.moveUntilStops();
  return data.moveCount;
};
