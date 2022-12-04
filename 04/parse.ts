import { Assignment, ElfPair } from "./types.ts";

const parseAssignment = (input: string): Assignment => {
  const [a, b] = input.split("-");
  return [Number(a), Number(b)];
};

export const parseFile = (file: string[]): ElfPair[] => {
  return file.map((line) => {
    const [l, m] = line.split(",");
    return [parseAssignment(l), parseAssignment(m)];
  });
};
