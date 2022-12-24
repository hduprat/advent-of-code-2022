import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { RockFormation } from "./RockFormation.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";

const inputFile: string[] = [">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>"];

const jets: (-1 | 1)[] = [
  1, 1, 1, -1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, -1, -1, -1, 1, 1,
  1, -1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, 1, 1,
];

describe("Day 17", () => {
  it("parses the file into jets", () => {
    assertEquals(parseFile(inputFile), jets);
  });

  it("computes the height of the rock column when the first rock has rested", () => {
    const rockFormation = new RockFormation(jets);
    rockFormation.waitForFallenRock();

    assertEquals(rockFormation.height, 1);
  });

  it("computes the height of the rock column when the second rock has rested", () => {
    const rockFormation = new RockFormation(jets);
    rockFormation.waitForFallenRocks(2);

    assertEquals(rockFormation.height, 4);
  });

  it("computes the height of the rock column when the third rock has rested", () => {
    const rockFormation = new RockFormation(jets);
    rockFormation.waitForFallenRocks(3);

    assertEquals(rockFormation.height, 6);
  });

  describe("Problem 1", () => {
    it("computes the height of the rock column when the 2022nd rock has rested", () => {
      assertEquals(solveProblem1(jets), 3068);
    });
  });

  describe("Problem 2", () => {
    it("computes the height of the rock column when rock #1000000000000 has rested", () => {
      assertEquals(solveProblem2(jets), 1514285714288);
    });
  });
});
