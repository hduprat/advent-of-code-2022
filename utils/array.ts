export const sum = (array: number[]) =>
  array.reduce((acc, elt) => acc + elt, 0);

export const mapSum = <T>(array: T[], func: (n: T) => number) =>
  sum(array.map(func));

export const unique = <T>(array: T[]): T[] =>
  array.filter((item, index, arr) => !arr.slice(0, index).includes(item));

export const formGroups = <T>(array: T[], n: number): T[][] => {
  if (array.length <= n) return [array];
  return [array.slice(0, n), ...formGroups(array.slice(n), n)];
};
