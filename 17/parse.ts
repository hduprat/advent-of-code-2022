export const parseFile = (file: string[]): (-1 | 1)[] => {
  return file[0].split("").map((c) => (c === ">" ? 1 : -1));
};
