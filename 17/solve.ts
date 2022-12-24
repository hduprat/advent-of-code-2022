import { RockFormation } from "./RockFormation.ts";

export const solveProblem1 = (data: (-1 | 1)[]): number => {
  const rockFormation = new RockFormation(data);
  rockFormation.waitForFallenRocks(2022);
  return rockFormation.height;
};

export const solveProblem2 = (data: (-1 | 1)[]): number => {
  const rockFormation = new RockFormation(data);
  rockFormation.waitForFallenRocks(1000000000000);
  return rockFormation.height;
};
