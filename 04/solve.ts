import { ElfPair } from "./types.ts";

export const isPairRedundant = (pair: ElfPair): boolean => {
  const assignmentLengths = pair.map(
    (assignment) => assignment[1] - assignment[0]
  );

  const smallestAssignmentIndex =
    assignmentLengths[0] < assignmentLengths[1] ? 0 : 1;
  const largestAssignmentIndex = 1 - smallestAssignmentIndex;
  return (
    pair[smallestAssignmentIndex][0] >= pair[largestAssignmentIndex][0] &&
    pair[smallestAssignmentIndex][1] <= pair[largestAssignmentIndex][1]
  );
};

export const solveProblem1 = (data: ElfPair[]): number => {
  return data.filter(isPairRedundant).length;
};

export const pairOverlaps = (pair: ElfPair): boolean => {
  const [a, b] = pair;
  return (a[0] >= b[0] && a[0] <= b[1]) || (b[0] >= a[0] && b[0] <= a[1]);
};

export const solveProblem2 = (data: ElfPair[]): number => {
  return data.filter(pairOverlaps).length;
};
