import { AddOperation } from "./types.ts";

export const parseFile = (file: string[]): AddOperation[] => {
  const { operations } = file.reduce<{
    cycle: number;
    operations: AddOperation[];
  }>(
    (currentState, line) => {
      const opName = line.slice(0, 4);
      if (opName === "noop")
        return {
          ...currentState,
          cycle: currentState.cycle + 1,
        };
      if (opName === "addx") {
        return {
          operations: [
            ...currentState.operations,
            { cycle: currentState.cycle + 1, value: parseInt(line.slice(5)) },
          ],
          cycle: currentState.cycle + 2,
        };
      }
      return currentState;
    },
    { cycle: 1, operations: [] }
  );

  return operations;
};
