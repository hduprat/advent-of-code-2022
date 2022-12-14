import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";
import { HeightMap } from "./types.ts";

const inputFile: string[] = [
  "Sabqponm",
  "abcryxxl",
  "accszExk",
  "acctuvwj",
  "abdefghi",
];

const heightMap: HeightMap = {
  map: ["aabqponm", "abcryxxl", "accszzxk", "acctuvwj", "abdefghi"],
  start: { x: 0, y: 0 },
  end: { x: 5, y: 2 },
};

describe("Day 12", () => {
  it("parses the file into a height map", () => {
    assertEquals(parseFile(inputFile), heightMap);
  });

  describe("Problem 1", () => {
    it("climbs from the start to the end in the fewest steps possible", () => {
      assertEquals(solveProblem1(heightMap), 31);
    });
  });

  describe("Problem 2", () => {
    it("computes the fewest steps possible from a bottom point to the top", () => {
      assertEquals(solveProblem2(heightMap), 29);
    });
  });
});
