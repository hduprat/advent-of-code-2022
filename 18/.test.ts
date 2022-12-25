import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { countAdjacent, solveProblem1, solveProblem2 } from "./solve.ts";

const inputFile: string[] = [
  "2,2,2",
  "1,2,2",
  "3,2,2",
  "2,1,2",
  "2,3,2",
  "2,2,1",
  "2,2,3",
  "2,2,4",
  "2,2,6",
  "1,2,5",
  "3,2,5",
  "2,1,5",
  "2,3,5",
];

const cubeMap = new Set<string>([
  "2,2,2",
  "1,2,2",
  "3,2,2",
  "2,1,2",
  "2,3,2",
  "2,2,1",
  "2,2,3",
  "2,2,4",
  "2,2,6",
  "1,2,5",
  "3,2,5",
  "2,1,5",
  "2,3,5",
]);

describe("Day 18", () => {
  it("parses the file into a cube map", () => {
    assertEquals(parseFile(inputFile), cubeMap);
  });

  describe("Problem 1", () => {
    it("counts the number of adjacent cube from a given cube", () => {
      assertEquals(countAdjacent("2,2,4", cubeMap), 1);
      assertEquals(countAdjacent("2,2,2", cubeMap), 6);
    });

    it("counts all sides of cubes not connected to another one", () => {
      assertEquals(solveProblem1(cubeMap), 64);
    });
  });

  describe("Problem 2", () => {
    it("counts all exterior sides of cubes", () => {
      assertEquals(solveProblem2(cubeMap), 58);
    });
  });
});
