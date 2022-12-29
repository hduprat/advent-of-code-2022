export const reverseString = (str: string): string =>
  str.split("").toReversed().join("");

declare global {
  interface String {
    allIndexesOf(substr: string): number[];
  }
}

String.prototype.allIndexesOf = function (substr: string) {
  const indexes = [];
  let currentIndex;
  do {
    currentIndex = this.indexOf(substr, (currentIndex ?? -1) + 1);
    if (currentIndex >= 0) indexes.push(currentIndex);
  } while (currentIndex >= 0);

  return indexes;
};
