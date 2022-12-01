import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { getCaloriesFromTop3Elves, getCaloriesFromTopElf } from "./solve.ts";
import { Elf } from "./types.ts";

const inputFile = [
  "1000",
  "2000",
  "3000",
  "",
  "4000",
  "",
  "5000",
  "6000",
  "",
  "7000",
  "8000",
  "9000",
  "",
  "10000",
];

describe("Day 1", () => {
  it("parses the file into a list of elves carrying items", () => {
    const elves: Elf[] = [
      { items: [1000, 2000, 3000] },
      { items: [4000] },
      { items: [5000, 6000] },
      { items: [7000, 8000, 9000] },
      { items: [10000] },
    ];
    assertEquals(parseFile(inputFile), elves);
  });

  it("computes the highest number of calories carried by an elf [Problem 1]", () => {
    const elves: Elf[] = [
      { items: [1000, 2000, 3000] },
      { items: [4000] },
      { items: [5000, 6000] },
      { items: [7000, 8000, 9000] },
      { items: [10000] },
    ];

    assertEquals(getCaloriesFromTopElf(elves), 24000);
  });

  it("computes the highest number of calories carried by the top 3 elves [Problem 2]", () => {
    const elves: Elf[] = [
      { items: [1000, 2000, 3000] },
      { items: [4000] },
      { items: [5000, 6000] },
      { items: [7000, 8000, 9000] },
      { items: [10000] },
    ];

    assertEquals(getCaloriesFromTop3Elves(elves), 45000);
  });
});
