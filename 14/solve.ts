import { Cave } from "./Cave.ts";

export const solveProblem1 = (cave: Cave): number => {
  let i = 0;
  while (i < Number.MAX_VALUE) {
    try {
      cave.addSand();
    } catch {
      return i;
    }
    i++;
  }
  return i;
};

export const solveProblem2 = (cave: Cave): number => {
  const caveWithFloor = cave.copy(true);

  let i = 0;
  while (i < Number.MAX_VALUE) {
    try {
      caveWithFloor.addSand();
    } catch {
      return i;
    }
    i++;
  }
  return i;
};
