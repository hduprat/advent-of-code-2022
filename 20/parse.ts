import { SequenceNumber } from "./types.ts";

export const parseFile = (file: string[]): SequenceNumber[] => {
  return file.map((line, index) => ({ n: Number(line), index }));
};
