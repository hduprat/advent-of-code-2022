import {
  assert,
  assertEquals,
  assertFalse,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import {
  isInRightOrder,
  solveProblem1,
  solveProblem2,
  sortPackets,
} from "./solve.ts";
import { PacketPair, SubPacket } from "./types.ts";

const inputFile: string[] = [
  "[1,1,3,1,1]",
  "[1,1,5,1,1]",
  "",
  "[[1],[2,3,4]]",
  "[[1],4]",
  "",
  "[9]",
  "[[8,7,6]]",
  "",
  "[[4,4],4,4]",
  "[[4,4],4,4,4]",
  "",
  "[7,7,7,7]",
  "[7,7,7]",
  "",
  "[]",
  "[3]",
  "",
  "[[[]]]",
  "[[]]",
  "",
  "[1,[2,[3,[4,[5,6,7]]]],8,9]",
  "[1,[2,[3,[4,[5,6,0]]]],8,9]",
];

const packetPairs: PacketPair[] = [
  { left: [1, 1, 3, 1, 1], right: [1, 1, 5, 1, 1] },
  { left: [[1], [2, 3, 4]], right: [[1], 4] },
  { left: [9], right: [[8, 7, 6]] },
  { left: [[4, 4], 4, 4], right: [[4, 4], 4, 4, 4] },
  { left: [7, 7, 7, 7], right: [7, 7, 7] },
  { left: [], right: [3] },
  { left: [[[]]], right: [[]] },
  {
    left: [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
    right: [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
  },
];

const sortedPackets: SubPacket[][] = [
  [],
  [[]],
  [[[]]],
  [1, 1, 3, 1, 1],
  [1, 1, 5, 1, 1],
  [[1], [2, 3, 4]],
  [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
  [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
  [[1], 4],
  [3],
  [[4, 4], 4, 4],
  [[4, 4], 4, 4, 4],
  [7, 7, 7],
  [7, 7, 7, 7],
  [[8, 7, 6]],
  [9],
];

describe("Day 13", () => {
  it("parses the file into packet pairs", () => {
    assertEquals(parseFile(inputFile), packetPairs);
  });

  it("knows the packets [1, 1, 3, 1, 1] and [1, 1, 5, 1, 1] are in the right order", () => {
    assert(isInRightOrder(packetPairs[0].left, packetPairs[0].right));
  });

  it("knows [[1],[2,3,4]] and [[1],4] are in the right order", () => {
    assert(isInRightOrder(packetPairs[1].left, packetPairs[1].right));
  });

  it("knows [9] and [[8,7,6]] are in the wrong order", () => {
    assertFalse(isInRightOrder(packetPairs[2].left, packetPairs[2].right));
  });

  it("knows [[4,4],4,4] and [[4,4],4,4,4] are in the right order", () => {
    assert(isInRightOrder(packetPairs[3].left, packetPairs[3].right));
  });
  it("knows [7,7,7,7] and [7,7,7] are in the wrong order", () => {
    assertFalse(isInRightOrder(packetPairs[4].left, packetPairs[4].right));
  });
  it("knows [] and [3] are in the right order", () => {
    assert(isInRightOrder(packetPairs[5].left, packetPairs[5].right));
  });

  it("knows [[[]]] and [[]] are in the wrong order", () => {
    assertFalse(isInRightOrder(packetPairs[6].left, packetPairs[6].right));
  });

  it("knows [1,[2,[3,[4,[5,6,7]]]],8,9] and [1,[2,[3,[4,[5,6,0]]]],8,9] are in the wrong order", () => {
    assertFalse(isInRightOrder(packetPairs[7].left, packetPairs[7].right));
  });

  describe("Problem 1", () => {
    it("computes the sum of the indexes of packets in the right order", () => {
      assertEquals(solveProblem1(packetPairs), 13);
    });
  });

  describe("Problem 2", () => {
    it("sorts all packets", () => {
      assertEquals(
        sortPackets(packetPairs.flatMap(({ left, right }) => [left, right])),
        sortedPackets
      );
    });

    it("multiplies the indexes of decoder keys in sorted packets", () => {
      assertEquals(solveProblem2(packetPairs), 140);
    });
  });
});
