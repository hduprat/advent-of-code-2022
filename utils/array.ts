export const sum = (array: number[]) =>
  array.reduce((acc, elt) => acc + elt, 0);

export const mapSum = <T>(array: T[], func: (n: T) => number) =>
  sum(array.map(func));
