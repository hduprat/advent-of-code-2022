import { formGroups, mapSum, unique } from "../utils/array.ts";

const MIN_LOWER_CHAR_CODE = "a".charCodeAt(0);
const MIN_UPPER_CHAR_CODE = "A".charCodeAt(0);

export const findCommonItem = (bags: string[]): string | undefined => {
  if (bags.length < 2)
    throw new Error("findCommonItem should accept at least 2 bags");

  const bagRegex = new RegExp(`[${bags[0]}]`, "g");
  const commonItems = bags[1].match(bagRegex);

  if (!commonItems) return undefined;
  const uniqueCommonItems = unique(commonItems);
  if (uniqueCommonItems.length === 1) return uniqueCommonItems[0];

  const remainingBags = bags.slice(2);
  if (remainingBags.length === 0)
    throw new Error("there is more than one common item");

  return findCommonItem([uniqueCommonItems.join(""), ...remainingBags]);
};

export const findItemInBothHalves = (rucksack: string): string | undefined =>
  findCommonItem([
    rucksack.slice(0, rucksack.length / 2),
    rucksack.slice(rucksack.length / 2),
  ]);

const computePriority = (char: string): number => {
  if (char.length > 1)
    throw new Error("computePriority needs a single character");

  if (char.length === 0) return 0;

  const lowerCode = char.charCodeAt(0) - MIN_LOWER_CHAR_CODE + 1;
  if (lowerCode <= 26 && lowerCode > 0) return lowerCode;

  const upperCode = char.charCodeAt(0) - MIN_UPPER_CHAR_CODE + 27;

  return upperCode;
};

export const solveProblem1 = (data: string[]): number =>
  mapSum(data, (rucksack) =>
    computePriority(findItemInBothHalves(rucksack) ?? "")
  );

export const solveProblem2 = (data: string[]): number => {
  const groups = formGroups(data, 3);
  return mapSum(groups, (group) =>
    computePriority(findCommonItem(group) ?? "")
  );
};
