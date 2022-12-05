import { reverseString } from "../utils/string.ts";
import { Instruction } from "./types.ts";

export const executeInstruction = (
  stacks: string[],
  instruction: Instruction,
  takeMany: boolean
): string[] => {
  const { numberOfCrates, start, end } = instruction;
  return stacks.map((stack, index, allStacks) => {
    const takenStacks = allStacks[start - 1].slice(0, numberOfCrates);
    switch (index + 1) {
      case start:
        return stack.slice(numberOfCrates);
      case end:
        return `${takeMany ? takenStacks : reverseString(takenStacks)}${stack}`;
      default:
        return stack;
    }
  });
};

const solveProblem = (
  stacks: string[],
  instructions: Instruction[],
  takeMany: boolean
): string => {
  const finalStacks = instructions.reduce(
    (currentStacks, instruction) =>
      executeInstruction(currentStacks, instruction, takeMany),
    stacks
  );
  return finalStacks.map((stack) => stack[0]).join("");
};

export const solveProblem1 = (
  stacks: string[],
  instructions: Instruction[]
): string => solveProblem(stacks, instructions, false);

export const solveProblem2 = (
  stacks: string[],
  instructions: Instruction[]
): string => solveProblem(stacks, instructions, true);
