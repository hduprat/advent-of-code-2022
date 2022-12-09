import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { reducer, solveProblem1, solveProblem2 } from "./solve.ts";
import { Move, State } from "./types.ts";

const inputFile: string[] = [
  "R 4",
  "U 4",
  "L 3",
  "D 1",
  "R 4",
  "D 1",
  "L 5",
  "R 2",
];

const moves: Move[] = [
  {
    direction: "right",
    stepCount: 4,
  },
  {
    direction: "up",
    stepCount: 4,
  },
  {
    direction: "left",
    stepCount: 3,
  },
  {
    direction: "down",
    stepCount: 1,
  },
  {
    direction: "right",
    stepCount: 4,
  },
  {
    direction: "down",
    stepCount: 1,
  },
  {
    direction: "left",
    stepCount: 5,
  },
  {
    direction: "right",
    stepCount: 2,
  },
];

describe("Day 9", () => {
  it("parses the file into a move map", () => {
    assertEquals(parseFile(inputFile), moves);
  });

  it("does not move the tail if it is still touching the head", () => {
    const input: State = {
      tailPositions: [{ x: 0, y: 0 }],
      knots: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
    };

    const output: State = {
      tailPositions: [{ x: 0, y: 0 }],
      knots: [
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ],
    };
    assertEquals(reducer(input, "right"), output);
  });

  it("moves the tail if it is not touching the head after it moves in the same direction, and updates positions", () => {
    const input: State = {
      tailPositions: [{ x: 0, y: 0 }],
      knots: [
        { x: 1, y: 0 },
        { x: 0, y: 0 },
      ],
    };

    const output: State = {
      tailPositions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      knots: [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
      ],
    };
    assertEquals(reducer(input, "right"), output);
  });

  it("moves the tail diagonally if it is not touching the head after it moves in another direction, and updates positions", () => {
    const input: State = {
      tailPositions: [{ x: 0, y: 0 }],
      knots: [
        { x: 1, y: 1 },
        { x: 0, y: 0 },
      ],
    };

    const output: State = {
      tailPositions: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
      knots: [
        { x: 1, y: 2 },
        { x: 1, y: 1 },
      ],
    };
    assertEquals(reducer(input, "up"), output);
  });

  describe("Problem 1", () => {
    it("counts the total positions taken by the tail after all moves", () => {
      assertEquals(solveProblem1(moves), 13);
    });
  });

  describe("Problem 2", () => {
    it("works with more than 2 knots", () => {
      const input: State = {
        tailPositions: [{ x: 0, y: 0 }],
        knots: [
          { x: 4, y: 3 },
          { x: 4, y: 2 },
          { x: 3, y: 1 },
          { x: 2, y: 1 },
          { x: 1, y: 1 },
          { x: 0, y: 0 },
        ],
      };

      const output: State = {
        tailPositions: [
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ],
        knots: [
          { x: 4, y: 4 },
          { x: 4, y: 3 },
          { x: 4, y: 2 },
          { x: 3, y: 2 },
          { x: 2, y: 2 },
          { x: 1, y: 1 },
        ],
      };
      assertEquals(reducer(input, "up"), output);
    });

    it("counts the total positions taken by the tail (outermost knot) after all moves", () => {
      assertEquals(
        solveProblem2(
          parseFile([
            "R 5",
            "U 8",
            "L 8",
            "D 3",
            "R 17",
            "D 10",
            "L 25",
            "U 20",
          ])
        ),
        36
      );
    });
  });
});
