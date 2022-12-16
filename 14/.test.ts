import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { Cave } from "./Cave.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";

const inputFile: string[] = [
  "498,4 -> 498,6 -> 496,6",
  "503,4 -> 502,4 -> 502,9 -> 494,9",
];

const cave = new Cave(
  new Map([
    [494, new Set([9])],
    [495, new Set([9])],
    [496, new Set([9, 6])],
    [497, new Set([9, 6])],
    [498, new Set([9, 6, 5, 4])],
    [499, new Set([9])],
    [500, new Set([9])],
    [501, new Set([9])],
    [502, new Set([9, 8, 7, 6, 5, 4])],
    [503, new Set([4])],
  ])
);

describe("Day 14", () => {
  it("parses the file into a cave", () => {
    assertEquals(parseFile(inputFile), cave);
  });

  it("correctly locates the first resting grain of sand", () => {
    const newCave = cave.copy().addSand();
    assertEquals(newCave.at(500), new Set([9, 8]));
  });

  it("correctly locates the second resting grain of sand", () => {
    const newCave = cave.copy().addSand().addSand();
    assertEquals(newCave.at(499), new Set([9, 8]));
  });

  it("correctly locates the third resting grain of sand", () => {
    const newCave = cave.copy().addSand().addSand().addSand();
    assertEquals(newCave.at(501), new Set([9, 8]));
  });

  it("correctly locates the five first resting grains of sand", () => {
    const newCave = cave
      .copy()
      .addSand()
      .addSand()
      .addSand()
      .addSand()
      .addSand();
    assertEquals(newCave.at(498), new Set([9, 8, 6, 5, 4]));
    assertEquals(newCave.at(499), new Set([9, 8]));
    assertEquals(newCave.at(500), new Set([9, 8, 7]));
    assertEquals(newCave.at(501), new Set([9, 8]));
  });

  describe("Problem 1", () => {
    it("computes the count of grains of sand after which it never rests", () => {
      assertEquals(solveProblem1(cave.copy()), 24);
    });
  });

  describe("Problem 2", () => {
    it("creates a cave with a floor", () => {
      assertEquals(cave.copy(true).floorY, 11);
    });

    it("computes the count of grains of sand after which the entry is blocked", () => {
      assertEquals(solveProblem2(cave.copy()), 93);
    });
  });
});
