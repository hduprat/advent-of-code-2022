import {
  assert,
  assertEquals,
  assertFalse,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import {
  isPairRedundant,
  pairOverlaps,
  solveProblem1,
  solveProblem2,
} from "./solve.ts";
import { ElfPair } from "./types.ts";

const inputFile: string[] = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7",
  "6-6,4-6",
  "2-6,4-8",
];

const elfPairs: ElfPair[] = [
  [
    [2, 4],
    [6, 8],
  ],
  [
    [2, 3],
    [4, 5],
  ],
  [
    [5, 7],
    [7, 9],
  ],
  [
    [2, 8],
    [3, 7],
  ],
  [
    [6, 6],
    [4, 6],
  ],
  [
    [2, 6],
    [4, 8],
  ],
];

describe("Day 04", () => {
  it("parses the file into elf pairs", () => {
    assertEquals(parseFile(inputFile), elfPairs);
  });

  describe("Problem 1", () => {
    it("finds the pair 2-8 fully contains 3-7", () => {
      assert(
        isPairRedundant([
          [2, 8],
          [3, 7],
        ])
      );
    });

    it("finds the pair 6-6 is fully contained in 4-6", () => {
      assert(
        isPairRedundant([
          [6, 6],
          [4, 6],
        ])
      );
    });

    it("finds the pair 5-7 does not fully contain 7-9 and vice versa", () => {
      assertFalse(
        isPairRedundant([
          [5, 7],
          [7, 9],
        ])
      );
    });

    it("finds the count of redundant elf pairs [Problem 1]", () => {
      assertEquals(solveProblem1(elfPairs), 2);
    });
  });

  describe("Problem 2", () => {
    it("finds the pair 2-8 overlaps with 3-7", () => {
      assert(
        pairOverlaps([
          [2, 8],
          [3, 7],
        ])
      );
    });

    it("finds the pair 5-7 overlaps with 7-9", () => {
      assert(
        pairOverlaps([
          [5, 7],
          [7, 9],
        ])
      );
    });

    it("finds the pair 2-6 overlaps with 4-8", () => {
      assert(
        pairOverlaps([
          [2, 6],
          [4, 8],
        ])
      );
    });

    it("finds the pair 2-4 does not fully contain 6-8 and vice versa", () => {
      assertFalse(
        pairOverlaps([
          [2, 4],
          [6, 8],
        ])
      );
    });

    it("finds the count of overlapping elf pairs [Problem 2]", () => {
      assertEquals(solveProblem2(elfPairs), 4);
    });
  });
});
