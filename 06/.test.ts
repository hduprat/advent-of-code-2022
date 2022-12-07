import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";

const inputFile: string[] = ["mjqjpqmgbljsphdztnvjfqwrcgsmlb"];

describe("Day 06", () => {
  it("parses the file into something", () => {
    assertEquals(parseFile(inputFile), "mjqjpqmgbljsphdztnvjfqwrcgsmlb");
  });

  describe("Problem 1", () => {
    it("returns the number of characters until the first 4-character sequence having all different characters", () => {
      assertEquals(solveProblem1("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 7);
      assertEquals(solveProblem1("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
      assertEquals(solveProblem1("nppdvjthqldpwncqszvftbrmjlhg"), 6);
      assertEquals(solveProblem1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
      assertEquals(solveProblem1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
    });
  });

  describe("Problem 2", () => {
    it("returns the number of characters until the first 14-character sequence having all different characters", () => {
      assertEquals(solveProblem2("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19);
      assertEquals(solveProblem2("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23);
      assertEquals(solveProblem2("nppdvjthqldpwncqszvftbrmjlhg"), 23);
      assertEquals(solveProblem2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 29);
      assertEquals(solveProblem2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 26);
    });
  });
});
