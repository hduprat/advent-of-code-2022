import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";
import { Monke } from "./monke.ts";
import { Jungle, WorryJungle } from "./jungle.ts";

const inputFile: string[] = [
  "Monkey 0:",
  "  Starting items: 79, 98",
  "  Operation: new = old * 19",
  "  Test: divisible by 23",
  "    If true: throw to monkey 2",
  "    If false: throw to monkey 3",
  "",
  "Monkey 1:",
  "  Starting items: 54, 65, 75, 74",
  "  Operation: new = old + 6",
  "  Test: divisible by 19",
  "    If true: throw to monkey 2",
  "    If false: throw to monkey 0",
  "",
  "Monkey 2:",
  "  Starting items: 79, 60, 97",
  "  Operation: new = old * old",
  "  Test: divisible by 13",
  "    If true: throw to monkey 1",
  "    If false: throw to monkey 3",
  "",
  "Monkey 3:",
  "  Starting items: 74",
  "  Operation: new = old + 3",
  "  Test: divisible by 17",
  "    If true: throw to monkey 0",
  "    If false: throw to monkey 1",
];

const monkes = [
  new Monke({
    id: 0,
    items: [79, 98],
    operation: (old) => old * 19,
    divisor: 23,
    trueNext: 2,
    falseNext: 3,
  }),
  new Monke({
    id: 1,
    items: [54, 65, 75, 74],
    operation: (old) => old + 6,
    divisor: 19,
    trueNext: 2,
    falseNext: 0,
  }),
  new Monke({
    id: 2,
    items: [79, 60, 97],
    operation: (old) => old * old,
    divisor: 13,
    trueNext: 1,
    falseNext: 3,
  }),
  new Monke({
    id: 3,
    items: [74],
    operation: (old) => old + 3,
    divisor: 17,
    trueNext: 0,
    falseNext: 1,
  }),
];

describe("Day 11", () => {
  describe("Monke parsing", () => {
    const parsedMonkes = parseFile(inputFile);

    it("has a correct length", () => {
      assertEquals(parsedMonkes.length, monkes.length);
    });

    it("has the correct items", () => {
      for (let index = 0; index < parsedMonkes.length; index++) {
        const parsedMonke = parsedMonkes[index];
        const monke = monkes[index];
        assertEquals(parsedMonke.items, monke.items);
      }
    });

    it("has the correct operation", () => {
      for (let index = 0; index < parsedMonkes.length; index++) {
        const parsedMonke = parsedMonkes[index];
        const monke = monkes[index];
        assertEquals(parsedMonke.operation(100), monke.operation(100));
      }
    });

    it("has the correct divisor", () => {
      for (let index = 0; index < parsedMonkes.length; index++) {
        const parsedMonke = parsedMonkes[index];
        const monke = monkes[index];
        assertEquals(parsedMonke.divisor, monke.divisor);
      }
    });

    it("has the correct monke ID for true", () => {
      for (let index = 0; index < parsedMonkes.length; index++) {
        const parsedMonke = parsedMonkes[index];
        const monke = monkes[index];
        assertEquals(parsedMonke.trueNext, monke.trueNext);
      }
    });

    it("has the correct monke ID for false", () => {
      for (let index = 0; index < parsedMonkes.length; index++) {
        const parsedMonke = parsedMonkes[index];
        const monke = monkes[index];
        assertEquals(parsedMonke.falseNext, monke.falseNext);
      }
    });
  });

  describe("Problem 1", () => {
    it("completes a round between monkes", () => {
      const jungle = new Jungle(monkes);
      jungle.completeRound();
      assertEquals(jungle.monkes[0].items, [20, 23, 27, 26]);
      assertEquals(jungle.monkes[1].items, [2080, 25, 167, 207, 401, 1046]);
      assertEquals(jungle.monkes[2].items, []);
      assertEquals(jungle.monkes[3].items, []);
    });

    it("completes 2 rounds between monkes", () => {
      const jungle = new Jungle(monkes);
      jungle.completeRounds(2);
      assertEquals(jungle.monkes[0].items, [695, 10, 71, 135, 350]);
      assertEquals(jungle.monkes[1].items, [43, 49, 58, 55, 362]);
      assertEquals(jungle.monkes[2].items, []);
      assertEquals(jungle.monkes[3].items, []);
    });

    it("completes 20 rounds between monkes", () => {
      const jungle = new Jungle(monkes);
      jungle.completeRounds(20);
      assertEquals(jungle.monkes[0].items, [10, 12, 14, 26, 34]);
      assertEquals(jungle.monkes[1].items, [245, 93, 53, 199, 115]);
      assertEquals(jungle.monkes[2].items, []);
      assertEquals(jungle.monkes[3].items, []);
    });

    it("computes the monke business of all monkes after 20 rounds", () => {
      assertEquals(solveProblem1(parseFile(inputFile)), 10605);
    });
  });

  describe("Problem 2", () => {
    it("computes the monke inspections after the first round", () => {
      const jungle = new WorryJungle(monkes);
      jungle.completeRound();
      assertEquals(
        jungle.monkes.map((monke) => monke.inspectCount),
        [2, 4, 3, 6]
      );
    });

    it("computes the monke inspections after 20 rounds", () => {
      const jungle = new WorryJungle(monkes);
      jungle.completeRounds(20);
      assertEquals(
        jungle.monkes.map((monke) => monke.inspectCount),
        [99, 97, 8, 103]
      );
    });

    it("computes the monke inspections after 1000 rounds", () => {
      const jungle = new WorryJungle(monkes);
      jungle.completeRounds(1000);
      assertEquals(
        jungle.monkes.map((monke) => monke.inspectCount),
        [5204, 4792, 199, 5192]
      );
    });

    it("computes the monke inspections after 10000 rounds", () => {
      const jungle = new WorryJungle(monkes);
      jungle.completeRounds(10000);
      assertEquals(
        jungle.monkes.map((monke) => monke.inspectCount),
        [52166, 47830, 1938, 52013]
      );
    });

    it("computes the monke business of all monkes after 10000 rounds", () => {
      assertEquals(solveProblem2(parseFile(inputFile)), 2713310158);
    });
  });
});
