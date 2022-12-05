import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { executeInstruction, solveProblem1, solveProblem2 } from "./solve.ts";
import { Instruction } from "./types.ts";

const inputFile: string[] = [
  "    [D]    ",
  "[N] [C]    ",
  "[Z] [M] [P]",
  " 1   2   3 ",
  "",
  "move 1 from 2 to 1",
  "move 3 from 1 to 3",
  "move 2 from 2 to 1",
  "move 1 from 1 to 2",
];

const crates = ["NZ", "DCM", "P"];

const instructions: Instruction[] = [
  {
    numberOfCrates: 1,
    start: 2,
    end: 1,
  },
  {
    numberOfCrates: 3,
    start: 1,
    end: 3,
  },
  {
    numberOfCrates: 2,
    start: 2,
    end: 1,
  },
  {
    numberOfCrates: 1,
    start: 1,
    end: 2,
  },
];

describe("Day 05", () => {
  it("parses the file into a list of crates", () => {
    const { stacks: inputCrates } = parseFile(inputFile);
    assertEquals(inputCrates, crates);
  });

  it("also parses the file into a list of instructions", () => {
    const { instructions: inputInstructions } = parseFile(inputFile);
    assertEquals(inputInstructions, instructions);
  });

  describe("Problem 1", () => {
    it("correctly executes instruction 1", () => {
      assertEquals(executeInstruction(crates, instructions[0], false), [
        "DNZ",
        "CM",
        "P",
      ]);
    });

    it("correctly executes instruction 2", () => {
      assertEquals(
        executeInstruction(["DNZ", "CM", "P"], instructions[1], false),
        ["", "CM", "ZNDP"]
      );
    });

    it("correctly executes instruction 3", () => {
      assertEquals(
        executeInstruction(["", "CM", "ZNDP"], instructions[2], false),
        ["MC", "", "ZNDP"]
      );
    });

    it("correctly executes instruction 4", () => {
      assertEquals(
        executeInstruction(["MC", "", "ZNDP"], instructions[3], false),
        ["C", "M", "ZNDP"]
      );
    });

    it("correctly detects crates on top of stacks [Problem 1]", () => {
      assertEquals(solveProblem1(crates, instructions), "CMZ");
    });
  });

  describe("Problem 2", () => {
    it("correctly executes instruction 1", () => {
      assertEquals(executeInstruction(crates, instructions[0], true), [
        "DNZ",
        "CM",
        "P",
      ]);
    });

    it("correctly executes instruction 2", () => {
      assertEquals(
        executeInstruction(["DNZ", "CM", "P"], instructions[1], true),
        ["", "CM", "DNZP"]
      );
    });

    it("correctly executes instruction 3", () => {
      assertEquals(
        executeInstruction(["", "CM", "DNZP"], instructions[2], true),
        ["CM", "", "DNZP"]
      );
    });

    it("correctly executes instruction 4", () => {
      assertEquals(
        executeInstruction(["CM", "", "DNZP"], instructions[3], true),
        ["M", "C", "DNZP"]
      );
    });

    it("correctly detects crates on top of stacks [Problem 1]", () => {
      assertEquals(solveProblem2(crates, instructions), "MCD");
    });
  });
});
