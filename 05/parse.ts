import { Instruction } from "./types.ts";

const MAYBE_CRATE_REGEX = /(.{4})|(.{3}$)/g;
const INSTRUCTION_REGEX = /^move (\d+) from (\d+) to (\d+)$/;

const splitByEmptyLine = (lines: string[]): string[][] => {
  return lines.reduce<string[][]>(
    (output, line) => {
      const n = output.length - 1;
      if (line === "") {
        return [...output, []];
      }

      return [...output.slice(0, n), [...output[n], line]];
    },
    [[]]
  );
};

const parseStacks = (file: string[]): string[] => {
  const stacks: string[] = new Array(file[0].match(MAYBE_CRATE_REGEX)?.length);
  for (const line of file) {
    const maybeCrates = line.match(MAYBE_CRATE_REGEX);

    maybeCrates?.forEach((maybeCrate, index) => {
      if (maybeCrate.trim() === "") return;
      if (!isNaN(Number(maybeCrate))) return;
      stacks[index] = `${stacks[index] ?? ""}${maybeCrate[1]}`;
    });
  }

  return stacks;
};

const parseInstructions = (file: string[]): Instruction[] => {
  return file.map((line) => {
    const results = line.match(INSTRUCTION_REGEX);

    if (!results) throw new Error("there should be an instruction");
    const [numberOfCrates, start, end] = results.slice(1).map(Number);
    return {
      numberOfCrates,
      start,
      end,
    };
  });
};

export const parseFile = (
  file: string[]
): { stacks: string[]; instructions: Instruction[] } => {
  const [stackLines, instructionLines] = splitByEmptyLine(file);

  return {
    stacks: parseStacks(stackLines),
    instructions: parseInstructions(instructionLines),
  };
};
