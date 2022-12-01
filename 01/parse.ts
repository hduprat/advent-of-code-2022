import { Elf } from "./types.ts";

const regroupLines = <T>(
  file: string[],
  formatter: (input: string) => T
): T[][] => {
  const groups: T[][] = [[]];
  for (const line of file) {
    if (line === "") groups.push([]);
    else groups[groups.length - 1].push(formatter(line));
  }

  return groups;
};
export const parseFile = (file: string[]): Elf[] => {
  return regroupLines(file, parseInt).map((items) => ({
    items,
  }));
};
