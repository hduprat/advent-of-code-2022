import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile, parseFileForStrategy } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";
import { Round, RoundStrategy } from "./types.ts";

const inputFile: string[] = ["A Y", "B X", "C Z"];

describe("Day 02", () => {
  describe("Problem 1", () => {
    it("parses the file into a set of moves", () => {
      assertEquals<Round[]>(parseFile(inputFile), [
        {
          you: "📄",
          opponent: "🪨",
        },
        {
          you: "🪨",
          opponent: "📄",
        },
        {
          you: "✂️",
          opponent: "✂️",
        },
      ]);
    });

    it("computes a winning move with paper", () => {
      const game: Round[] = [
        {
          you: "📄",
          opponent: "🪨",
        },
      ];

      assertEquals(solveProblem1(game), 8);
    });

    it("computes a losing move with rock", () => {
      const game: Round[] = [
        {
          you: "🪨",
          opponent: "📄",
        },
      ];

      assertEquals(solveProblem1(game), 1);
    });

    it("computes a draw with scissors", () => {
      const game: Round[] = [
        {
          you: "✂️",
          opponent: "✂️",
        },
      ];

      assertEquals(solveProblem1(game), 6);
    });

    it("computes a 3-round game", () => {
      const game: Round[] = [
        {
          you: "📄",
          opponent: "🪨",
        },
        {
          you: "🪨",
          opponent: "📄",
        },
        {
          you: "✂️",
          opponent: "✂️",
        },
      ];

      assertEquals(solveProblem1(game), 15);
    });
  });

  describe("Problem 2", () => {
    it("parses the file into a set of strategies", () => {
      assertEquals<RoundStrategy[]>(parseFileForStrategy(inputFile), [
        {
          opponent: "🪨",
          strategy: "draw",
        },
        {
          opponent: "📄",
          strategy: "lose",
        },
        {
          opponent: "✂️",
          strategy: "win",
        },
      ]);
    });

    it("computes a draw move", () => {
      const game: RoundStrategy[] = [
        {
          opponent: "🪨",
          strategy: "draw",
        },
      ];

      assertEquals(solveProblem2(game), 4);
    });

    it("computes a losing move", () => {
      const game: RoundStrategy[] = [
        {
          opponent: "📄",
          strategy: "lose",
        },
      ];

      assertEquals(solveProblem2(game), 1);
    });

    it("computes a winning move", () => {
      const game: RoundStrategy[] = [
        {
          opponent: "✂️",
          strategy: "win",
        },
      ];

      assertEquals(solveProblem2(game), 7);
    });

    it("computes a 3-round game", () => {
      const game: RoundStrategy[] = [
        {
          opponent: "🪨",
          strategy: "draw",
        },
        {
          opponent: "📄",
          strategy: "lose",
        },
        {
          opponent: "✂️",
          strategy: "win",
        },
      ];

      assertEquals(solveProblem2(game), 12);
    });
  });
});
