import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";

import { parseFile } from "./parse.ts";
import {
  areSequenceNumbersEqual,
  mix,
  mixAll,
  mixAllNTimes,
  solveProblem1,
  solveProblem2,
} from "./solve.ts";
import "../utils/array.ts";
import { SequenceNumber } from "./types.ts";
const inputFile: string[] = ["1", "2", "-3", "3", "-2", "0", "4"];

const initialSequence: SequenceNumber[] = [
  { n: 1, index: 0 },
  { n: 2, index: 1 },
  { n: -3, index: 2 },
  { n: 3, index: 3 },
  { n: -2, index: 4 },
  { n: 0, index: 5 },
  { n: 4, index: 6 },
];

describe("Day 20", () => {
  it("parses the file into something", () => {
    assertEquals(parseFile(inputFile), initialSequence);
  });

  describe("Problem 1", () => {
    it("mixes the sequence with the first step", () => {
      assertEquals(
        mix(
          [
            { n: 1, index: 0 },
            { n: 2, index: 1 },
            { n: -3, index: 2 },
            { n: 3, index: 3 },
            { n: -2, index: 4 },
            { n: 0, index: 5 },
            { n: 4, index: 6 },
          ],
          { n: 1, index: 0 }
        ),
        [
          { n: 2, index: 1 },
          { n: 1, index: 0 },
          { n: -3, index: 2 },
          { n: 3, index: 3 },
          { n: -2, index: 4 },
          { n: 0, index: 5 },
          { n: 4, index: 6 },
        ]
      );
    });

    it("mixes the sequence with the second step", () => {
      assertEquals(
        mix(
          [
            { n: 2, index: 1 },
            { n: 1, index: 0 },
            { n: -3, index: 2 },
            { n: 3, index: 3 },
            { n: -2, index: 4 },
            { n: 0, index: 5 },
            { n: 4, index: 6 },
          ],
          { n: 2, index: 1 }
        ),
        [
          { n: 1, index: 0 },
          { n: -3, index: 2 },
          { n: 2, index: 1 },
          { n: 3, index: 3 },
          { n: -2, index: 4 },
          { n: 0, index: 5 },
          { n: 4, index: 6 },
        ]
      );
    });

    it("mixes the sequence with the third step", () => {
      assertEquals(
        mix(
          [
            { n: 1, index: 0 },
            { n: -3, index: 2 },
            { n: 2, index: 1 },
            { n: 3, index: 3 },
            { n: -2, index: 4 },
            { n: 0, index: 5 },
            { n: 4, index: 6 },
          ],
          { n: -3, index: 2 }
        ),
        [
          { n: 1, index: 0 },
          { n: 2, index: 1 },
          { n: 3, index: 3 },
          { n: -2, index: 4 },
          { n: -3, index: 2 },
          { n: 0, index: 5 },
          { n: 4, index: 6 },
        ]
      );
    });

    it("finds the final sequence", () => {
      assert(
        mixAll(initialSequence).isLoopEqual(
          [
            { n: 1, index: 0 },
            { n: 2, index: 1 },
            { n: -3, index: 2 },
            { n: 4, index: 6 },
            { n: 0, index: 5 },
            { n: 3, index: 3 },
            { n: -2, index: 4 },
          ],
          areSequenceNumbersEqual
        )
      );
    });

    it("computes the sum of the grove coordinates", () => {
      assertEquals(solveProblem1(initialSequence), 3);
    });
  });

  describe("Problem 2", () => {
    it("completes a round of mixing", () => {
      const result = mixAll([
        { n: 811589153, index: 0 },
        { n: 1623178306, index: 1 },
        { n: -2434767459, index: 2 },
        { n: 2434767459, index: 3 },
        { n: -1623178306, index: 4 },
        { n: 0, index: 5 },
        { n: 3246356612, index: 6 },
      ]);
      assert(
        result.isLoopEqual(
          [
            { n: 0, index: 5 },
            { n: -2434767459, index: 2 },
            { n: 3246356612, index: 6 },
            { n: -1623178306, index: 4 },
            { n: 2434767459, index: 3 },
            { n: 1623178306, index: 1 },
            { n: 811589153, index: 0 },
          ],
          areSequenceNumbersEqual
        )
      );
    });

    it("completes 10 rounds of mixing", () => {
      const result = mixAllNTimes(
        [
          { n: 811589153, index: 0 },
          { n: 1623178306, index: 1 },
          { n: -2434767459, index: 2 },
          { n: 2434767459, index: 3 },
          { n: -1623178306, index: 4 },
          { n: 0, index: 5 },
          { n: 3246356612, index: 6 },
        ],
        10
      );
      assert(
        result.isLoopEqual(
          [
            { n: 0, index: 5 },
            { n: -2434767459, index: 2 },
            { n: 1623178306, index: 1 },
            { n: 3246356612, index: 6 },
            { n: -1623178306, index: 4 },
            { n: 2434767459, index: 3 },
            { n: 811589153, index: 0 },
          ],
          areSequenceNumbersEqual
        )
      );
    });

    it("computes the sum of the grove coordinates", () => {
      assertEquals(solveProblem2(initialSequence), 1623178306);
    });
  });
});
