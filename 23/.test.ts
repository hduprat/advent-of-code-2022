import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { ElfMap } from "./ElfMap.ts";
import { parseFile } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";

const smallInputFile: string[] = [
  ".....",
  "..##.",
  "..#..",
  ".....",
  "..##.",
  ".....",
];

const smallElves = new ElfMap(
  new Set<string>(["2,1", "3,1", "2,2", "2,4", "3,4"])
);

const inputFile: string[] = [
  "....#..",
  "..###.#",
  "#...#.#",
  ".#...##",
  "#.###..",
  "##.#.##",
  ".#..#..",
];

describe("Day 23", () => {
  it("parses the file into an elf map", () => {
    assertEquals(parseFile(smallInputFile), smallElves);
  });

  describe("Small example", () => {
    it("makes the elves move one step", () => {
      assertEquals(
        smallElves.move().getElves(),
        new Set(["2,0", "3,0", "2,2", "3,3", "2,4"])
      );
    });

    it("makes the elves two more times until they stop", () => {
      assertEquals(
        smallElves.moveUntil(3).getElves(),
        new Set(["2,0", "4,1", "0,2", "4,3", "2,5"])
      );
    });
  });

  describe("Problem 1", () => {
    it("computes the positions of the elves after 10 rounds", () => {
      const elves = parseFile(inputFile);
      elves.moveUntil(10);

      assertEquals(
        elves.getElves(),
        new Set([
          "-2,3",
          "-1,0",
          "-1,5",
          "0,2",
          "1,0",
          "1,6",
          "1,8",
          "2,4",
          "3,1",
          "3,4",
          "3,6",
          "4,-2",
          "4,0",
          "4,8",
          "5,3",
          "6,2",
          "6,3",
          "6,6",
          "7,8",
          "8,-1",
          "8,5",
          "9,2",
        ])
      );
    });

    it("counts the empty tiles in the smallest rectangle containing elves", () => {
      const elves = parseFile(inputFile);
      elves.moveUntil(10);

      assertEquals(solveProblem1(elves), 110);
    });
  });

  describe("Problem 2", () => {
    it("computes the first round where no elf moves for the small example", () => {
      const elves = parseFile(smallInputFile);
      elves.moveUntilStops();

      assertEquals(elves.moveCount, 4);
    });

    it("computes the first round where no elf moves for the bigger example", () => {
      const elves = parseFile(inputFile);

      assertEquals(solveProblem2(elves), 20);
    });
  });
});
