import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import {
  computeScenicScore,
  computeVisibilityMap,
  solveProblem1,
  solveProblem2,
} from "./solve.ts";

const inputFile: string[] = ["30373", "25512", "65332", "33549", "35390"];

const heightMap: number[][] = [
  [3, 0, 3, 7, 3],
  [2, 5, 5, 1, 2],
  [6, 5, 3, 3, 2],
  [3, 3, 5, 4, 9],
  [3, 5, 3, 9, 0],
];

const visibilityMap: boolean[][] = [
  [true, true, true, true, true],
  [true, true, true, false, true],
  [true, true, false, true, true],
  [true, false, true, false, true],
  [true, true, true, true, true],
];

describe("Day 8", () => {
  it("parses the file into a tree height map", () => {
    assertEquals(parseFile(inputFile), heightMap);
  });

  describe("Problem 1", () => {
    it("parses the height map into a visibility map", () => {
      assertEquals(computeVisibilityMap(heightMap), visibilityMap);
    });
    it("counts the number of visible trees from any direction", () => {
      assertEquals(solveProblem1(heightMap), 21);
    });
  });

  describe("Problem 2", () => {
    it("attributes a scenic score of 0 to a tree on an edge", () => {
      assertEquals(computeScenicScore(heightMap, { x: 0, y: 2 }), 0);
      assertEquals(computeScenicScore(heightMap, { x: 4, y: 2 }), 0);
      assertEquals(computeScenicScore(heightMap, { x: 2, y: 0 }), 0);
      assertEquals(computeScenicScore(heightMap, { x: 2, y: 4 }), 0);
    });

    it("attributes the correct scenic score to a tree inside", () => {
      assertEquals(computeScenicScore(heightMap, { x: 2, y: 1 }), 4);
      assertEquals(computeScenicScore(heightMap, { x: 2, y: 3 }), 8);
    });

    it("finds the highest scenic scores from visible trees", () => {
      assertEquals(solveProblem2(heightMap), 8);
    });
  });
});
