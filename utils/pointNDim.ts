import { mapSum } from "./array.ts";

export const oneNorm = (A: number[], B: number[]): number => {
  if (A.length !== B.length)
    throw new Error("Dimension error; both arrays should have the same length");
  return mapSum(A, (p, i) => Math.abs(p - B[i]));
};
