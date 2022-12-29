import "../utils/string.ts";
import { ElfMap, keyOf } from "./ElfMap.ts";

const parseLine = (line: string, y: number): string[] => {
  const elvesX = line.allIndexesOf("#");
  return elvesX.map((x) => keyOf([x, y]));
};

export const parseFile = (file: string[]): ElfMap => {
  return new ElfMap(new Set(file.flatMap(parseLine)));
};
