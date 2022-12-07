import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import {
  getDirectoryTotalSize,
  solveProblem1,
  solveProblem2,
} from "./solve.ts";
import { FileSystem } from "./types.ts";

const inputFile: string[] = [
  "$ cd /",
  "$ ls",
  "dir a",
  "14848514 b.txt",
  "8504156 c.dat",
  "dir d",
  "$ cd a",
  "$ ls",
  "dir e",
  "29116 f",
  "2557 g",
  "62596 h.lst",
  "$ cd e",
  "$ ls",
  "584 i",
  "$ cd ..",
  "$ cd ..",
  "$ cd d",
  "$ ls",
  "4060174 j",
  "8033020 d.log",
  "5626152 d.ext",
  "7214296 k",
];

const fileSystem: FileSystem = {
  tree: new Map([
    ["", new Set(["/a", "/b.txt", "/c.dat", "/d"])],
    ["/a", new Set(["/a/e", "/a/f", "/a/g", "/a/h.lst"])],
    ["/a/e", new Set(["/a/e/i"])],
    ["/d", new Set(["/d/j", "/d/d.log", "/d/d.ext", "/d/k"])],
  ]),
  sizes: new Map([
    ["", 0],
    ["/a", 0],
    ["/b.txt", 14848514],
    ["/c.dat", 8504156],
    ["/d", 0],
    ["/a/e", 0],
    ["/a/f", 29116],
    ["/a/g", 2557],
    ["/a/h.lst", 62596],
    ["/a/e/i", 584],
    ["/d/j", 4060174],
    ["/d/d.log", 8033020],
    ["/d/d.ext", 5626152],
    ["/d/k", 7214296],
  ]),
};

describe("Day 7", () => {
  it("parses the file into a file system tree", () => {
    assertEquals(parseFile(inputFile), fileSystem);
  });

  it("computes the total size of a directory", () => {
    assertEquals(getDirectoryTotalSize("/a/e", fileSystem), 584);
    assertEquals(getDirectoryTotalSize("/a", fileSystem), 94853);
    assertEquals(getDirectoryTotalSize("/d", fileSystem), 24933642);
    assertEquals(getDirectoryTotalSize("", fileSystem), 48381165);
  });

  describe("Problem 1", () => {
    it("computes the sum of the sizes of directories with a size of at most 100000", () => {
      assertEquals(solveProblem1(fileSystem), 95437);
    });
  });

  describe("Problem 1", () => {
    it("chooses the smallest of the directories that could lead to a free space size of at least 30000000", () => {
      assertEquals(solveProblem2(fileSystem), 24933642);
    });
  });
});
