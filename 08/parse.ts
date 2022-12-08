export const parseFile = (file: string[]): number[][] =>
  file.map((line) => line.split("").map(Number));
