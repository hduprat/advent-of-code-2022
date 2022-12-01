import { sum } from "../utils/array.ts";
import { Elf } from "./types.ts";

const getTotalCaloriesPerElf = (elves: Elf[]): number[] =>
  elves.map((elf) => sum(elf.items));

export const getCaloriesFromTopElf = (elves: Elf[]): number => {
  return Math.max(...getTotalCaloriesPerElf(elves));
};

export const getCaloriesFromTop3Elves = (elves: Elf[]): number => {
  const sortedTotalCalories = getTotalCaloriesPerElf(elves).toSorted(
    (a, b) => b - a
  );

  return sum(sortedTotalCalories.slice(0, 3));
};
