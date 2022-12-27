import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { fromHumnToRoot, solveProblem1, solveProblem2, yell } from "./solve.ts";
import { Monke } from "./types.ts";

const inputFile: string[] = [
  "root: pppw + sjmn",
  "dbpl: 5",
  "cczh: sllz + lgvd",
  "zczc: 2",
  "ptdq: humn - dvpt",
  "dvpt: 3",
  "lfqf: 4",
  "humn: 5",
  "ljgn: 2",
  "sjmn: drzm * dbpl",
  "sllz: 4",
  "pppw: cczh / lfqf",
  "lgvd: ljgn * ptdq",
  "drzm: hmdt - zczc",
  "hmdt: 32",
];

const monkes: Map<string, Monke> = new Map([
  [
    "root",
    {
      type: "operator",
      operator: "+",
      leftOp: "pppw",
      rightOp: "sjmn",
    },
  ],
  [
    "dbpl",
    {
      type: "value",
      value: 5,
    },
  ],
  [
    "cczh",
    {
      type: "operator",
      operator: "+",
      leftOp: "sllz",
      rightOp: "lgvd",
    },
  ],
  [
    "zczc",
    {
      type: "value",
      value: 2,
    },
  ],
  [
    "ptdq",
    {
      type: "operator",
      operator: "-",
      leftOp: "humn",
      rightOp: "dvpt",
    },
  ],
  [
    "dvpt",
    {
      type: "value",
      value: 3,
    },
  ],
  [
    "lfqf",
    {
      type: "value",
      value: 4,
    },
  ],
  [
    "humn",
    {
      type: "value",
      value: 5,
    },
  ],
  [
    "ljgn",
    {
      type: "value",
      value: 2,
    },
  ],
  [
    "sjmn",
    {
      type: "operator",
      operator: "*",
      leftOp: "drzm",
      rightOp: "dbpl",
    },
  ],
  [
    "sllz",
    {
      type: "value",
      value: 4,
    },
  ],
  [
    "pppw",
    {
      type: "operator",
      operator: "/",
      leftOp: "cczh",
      rightOp: "lfqf",
    },
  ],
  [
    "lgvd",
    {
      type: "operator",
      operator: "*",
      leftOp: "ljgn",
      rightOp: "ptdq",
    },
  ],
  [
    "drzm",
    {
      type: "operator",
      operator: "-",
      leftOp: "hmdt",
      rightOp: "zczc",
    },
  ],
  [
    "hmdt",
    {
      type: "value",
      value: 32,
    },
  ],
]);

const humnToRoot: Map<string, Monke> = new Map([
  [
    "humn",
    {
      type: "operator",
      leftOp: "ptdq",
      operator: "+",
      rightOp: "dvpt",
    },
  ],
  [
    "ptdq",
    {
      type: "operator",
      leftOp: "lgvd",
      operator: "/",
      rightOp: "ljgn",
    },
  ],
  [
    "lgvd",
    {
      type: "operator",
      leftOp: "cczh",
      operator: "-",
      rightOp: "sllz",
    },
  ],
  [
    "cczh",
    {
      type: "operator",
      leftOp: "pppw",
      operator: "*",
      rightOp: "lfqf",
    },
  ],
  [
    "pppw",
    {
      type: "value",
      value: 0,
    },
  ],
]);

describe("Day 21", () => {
  it("parses the file into monkes", () => {
    assertEquals(parseFile(inputFile), monkes);
  });

  describe("Problem 1", () => {
    it("makes a monke yell its number", () => {
      assertEquals(yell("hmdt", monkes), 32);
    });

    it("makes a monke yell an operation on numbers", () => {
      assertEquals(yell("drzm", monkes), 30);
    });

    it("computes the number yelled by the root monke", () => {
      assertEquals(solveProblem1(monkes), 152);
    });
  });

  describe("Problem 2", () => {
    it("gets a map from humn to root", () => {
      assertEquals(fromHumnToRoot(monkes), humnToRoot);
    });

    it("gets the humn value for root to return true", () => {
      assertEquals(solveProblem2(monkes), 301);
    });
  });
});
