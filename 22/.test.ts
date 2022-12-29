import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import {
  getInitialPosition,
  move,
  moveWholePath,
  solveProblem1,
} from "./solve.ts";
import { BoardMap } from "./types.ts";

const inputFile: string[] = [
  "        ...#    ",
  "        .#..    ",
  "        #...    ",
  "        ....    ",
  "...#.......#    ",
  "........#...    ",
  "..#....#....    ",
  "..........#.    ",
  "        ...#....",
  "        .....#..",
  "        .#......",
  "        ......#.",
  "",
  "10R5L5R10L4R5L5",
];

const boardMap: BoardMap = {
  lines: [
    [8, 11],
    [8, 11],
    [8, 11],
    [8, 11],
    [0, 11],
    [0, 11],
    [0, 11],
    [0, 11],
    [8, 15],
    [8, 15],
    [8, 15],
    [8, 15],
  ],
  walls: new Set([
    [2, 6],
    [3, 4],
    [7, 6],
    [8, 2],
    [8, 5],
    [9, 1],
    [9, 10],
    [10, 7],
    [11, 0],
    [11, 4],
    [11, 8],
    [13, 9],
    [14, 11],
  ]),
};

const steps = [
  [10, 0],
  [0, 5],
  [5, 0],
  [0, 10],
  [4, 0],
  [0, 5],
  [5, 0],
];

const board = { map: boardMap, steps };

describe("Day 22", () => {
  it("parses the file into a board", () => {
    assertEquals(parseFile(inputFile), board);
  });

  describe("Problem 1", () => {
    it("detects the initial position", () => {
      assertEquals(getInitialPosition(board), [8, 0]);
    });

    it("moves until the first wall", () => {
      assertEquals(move(board, { from: [8, 0], stepNumber: 0 }), [10, 0]);
    });

    it("then moves until it stops", () => {
      assertEquals(move(board, { from: [10, 0], stepNumber: 1 }), [10, 5]);
    });

    it("then moves while looping through the map", () => {
      assertEquals(move(board, { from: [10, 5], stepNumber: 2 }), [3, 5]);
    });

    it("stops at the correct point after moving the whole path", () => {
      assertEquals(moveWholePath(board, [8, 0]), [7, 5]);
    });

    it("computes the final password", () => {
      assertEquals(solveProblem1(board), 6032);
    });
  });
});
