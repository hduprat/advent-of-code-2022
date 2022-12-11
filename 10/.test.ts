import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { getSignalStrength, solveProblem1, solveProblem2 } from "./solve.ts";
import { AddOperation } from "./types.ts";

const inputFile: string[] = ["noop", "addx 3", "addx -5"];

const operations: AddOperation[] = [
  { cycle: 3, value: 3 },
  { cycle: 5, value: -5 },
];

const bigInput = [
  "addx 15",
  "addx -11",
  "addx 6",
  "addx -3",
  "addx 5",
  "addx -1",
  "addx -8",
  "addx 13",
  "addx 4",
  "noop",
  "addx -1",
  "addx 5",
  "addx -1",
  "addx 5",
  "addx -1",
  "addx 5",
  "addx -1",
  "addx 5",
  "addx -1",
  "addx -35",
  "addx 1",
  "addx 24",
  "addx -19",
  "addx 1",
  "addx 16",
  "addx -11",
  "noop",
  "noop",
  "addx 21",
  "addx -15",
  "noop",
  "noop",
  "addx -3",
  "addx 9",
  "addx 1",
  "addx -3",
  "addx 8",
  "addx 1",
  "addx 5",
  "noop",
  "noop",
  "noop",
  "noop",
  "noop",
  "addx -36",
  "noop",
  "addx 1",
  "addx 7",
  "noop",
  "noop",
  "noop",
  "addx 2",
  "addx 6",
  "noop",
  "noop",
  "noop",
  "noop",
  "noop",
  "addx 1",
  "noop",
  "noop",
  "addx 7",
  "addx 1",
  "noop",
  "addx -13",
  "addx 13",
  "addx 7",
  "noop",
  "addx 1",
  "addx -33",
  "noop",
  "noop",
  "noop",
  "addx 2",
  "noop",
  "noop",
  "noop",
  "addx 8",
  "noop",
  "addx -1",
  "addx 2",
  "addx 1",
  "noop",
  "addx 17",
  "addx -9",
  "addx 1",
  "addx 1",
  "addx -3",
  "addx 11",
  "noop",
  "noop",
  "addx 1",
  "noop",
  "addx 1",
  "noop",
  "noop",
  "addx -13",
  "addx -19",
  "addx 1",
  "addx 3",
  "addx 26",
  "addx -30",
  "addx 12",
  "addx -1",
  "addx 3",
  "addx 1",
  "noop",
  "noop",
  "noop",
  "addx -9",
  "addx 18",
  "addx 1",
  "addx 2",
  "noop",
  "noop",
  "addx 9",
  "noop",
  "noop",
  "noop",
  "addx -1",
  "addx 2",
  "addx -37",
  "addx 1",
  "addx 3",
  "noop",
  "addx 15",
  "addx -21",
  "addx 22",
  "addx -6",
  "addx 1",
  "noop",
  "addx 2",
  "addx 1",
  "noop",
  "addx -10",
  "noop",
  "noop",
  "addx 20",
  "addx 1",
  "addx 2",
  "addx 2",
  "addx -6",
  "addx -11",
  "noop",
  "noop",
  "noop",
];

describe("Day 10", () => {
  it("parses the file into a set of operations", () => {
    assertEquals(parseFile(inputFile), operations);
  });

  it("computes the signal strength at a given cycle", () => {
    assertEquals(
      getSignalStrength(20, { operations: parseFile(bigInput) }),
      420
    );
    assertEquals(
      getSignalStrength(60, { operations: parseFile(bigInput) }),
      1140
    );
    assertEquals(
      getSignalStrength(100, { operations: parseFile(bigInput) }),
      1800
    );
    assertEquals(
      getSignalStrength(140, { operations: parseFile(bigInput) }),
      2940
    );
    assertEquals(
      getSignalStrength(180, { operations: parseFile(bigInput) }),
      2880
    );
    assertEquals(
      getSignalStrength(220, { operations: parseFile(bigInput) }),
      3960
    );
  });

  describe("Problem 1", () => {
    it("computes the sum of the signal strength at cycles 20, 60, 100, 140, 180 and 220", () => {
      assertEquals(solveProblem1(parseFile(bigInput)), 13140);
    });
  });

  describe("Problem 2", () => {
    it("draws an image", () => {
      assertEquals(
        solveProblem2(parseFile(bigInput)),
        `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`
      );
    });
  });
});
