declare global {
  interface Array<T> {
    isLoopEqual(
      otherArray: Array<T>,
      equals?: (a: T, b: T) => boolean
    ): boolean;

    last(): T;
  }
}

Array.prototype.isLoopEqual = function <T>(
  arr: Array<T>,
  equals?: (a: T, b: T) => boolean
) {
  if (this.length !== arr.length) return false;
  for (let delta = 0; delta < this.length; delta++) {
    if (
      this.every((elt, i) => {
        if (equals) return equals(elt, arr[(i + delta) % arr.length]);
        return elt === arr[(i + delta) % arr.length];
      })
    )
      return true;
  }
  return false;
};

Array.prototype.last = function () {
  return this[this.length - 1];
};

export const sum = (array: number[]) =>
  array.reduce((acc, elt) => acc + elt, 0);

export const mapSum = <T>(array: T[], func: (n: T, index: number) => number) =>
  sum(array.map(func));

export const unique = <T>(array: T[]): T[] =>
  array.filter((item, index, arr) => !arr.slice(0, index).includes(item));

export const formGroups = <T>(array: T[], n: number): T[][] => {
  if (array.length <= n) return [array];
  return [array.slice(0, n), ...formGroups(array.slice(n), n)];
};

export const lastOf = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return undefined;
  return array[array.length - 1];
};

export const cutBefore = <T>(
  array: T[],
  predicate: (elt: T) => boolean
): T[] => {
  const index = array.findIndex(predicate);
  if (index === -1) return array;
  return array.slice(0, index);
};

export const window = <T>(array: T[], length: number): T[][] =>
  array
    .slice(length - 1)
    .map((elt, index) => [...array.slice(index, index + length - 1), elt]);
