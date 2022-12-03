import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import {
  findCommonItem,
  findItemInBothHalves,
  solveProblem1,
  solveProblem2,
} from "./solve.ts";

const inputFile: string[] = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

describe("Day 03", () => {
  it("parses the file into rucksacks containing items", () => {
    assertEquals(parseFile(inputFile), inputFile);
  });

  it("finds the common item between the two bags in each rucksack", () => {
    const expectedCommonItems = ["p", "L", "P", "v", "t", "s"];
    inputFile.forEach((sack, index) => {
      assertEquals(findItemInBothHalves(sack), expectedCommonItems[index]);
    });
  });

  it("computes the sum of the priorities of the found common items", () => {
    assertEquals(solveProblem1(inputFile), 157);
  });

  it("finds a common item in a group of 3 rucksacks", () => {
    assertEquals(findCommonItem(inputFile.slice(0, 3)), "r");
    assertEquals(findCommonItem(inputFile.slice(3)), "Z");
  });

  it("computes the sum of the priorities of the found common items between groups of 3", () => {
    assertEquals(solveProblem2(inputFile), 70);
  });
});
