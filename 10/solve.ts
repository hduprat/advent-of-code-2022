import { cutBefore, mapSum } from "../utils/array.ts";
import { AddOperation } from "./types.ts";

const getSignalValue = (
  cycle: number,
  params: { operations: AddOperation[] }
): number => {
  const signal = cutBefore(params.operations, (op) => op.cycle >= cycle);
  return 1 + mapSum(signal, (op) => op.value);
};

export const getSignalStrength = (
  cycle: number,
  params: { operations: AddOperation[] }
): number => {
  return getSignalValue(cycle, params) * cycle;
};

export const solveProblem1 = (data: AddOperation[]): number => {
  return mapSum([20, 60, 100, 140, 180, 220], (cycle) =>
    getSignalStrength(cycle, { operations: data })
  );
};

export const solveProblem2 = (data: AddOperation[]): string => {
  let output = "";
  for (let i = 1; i <= 240; i++) {
    const x = (i - 1) % 40;
    const spritePosition = getSignalValue(i, { operations: data });
    if (x <= spritePosition + 1 && x >= spritePosition - 1) output += "#";
    else output += ".";

    if (x === 39 && i < 240) output += "\n";
  }

  return output;
};
