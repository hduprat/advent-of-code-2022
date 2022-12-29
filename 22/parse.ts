import "../utils/string.ts";
import "../utils/number.ts";
import { cutBefore } from "../utils/array.ts";
import { Board, BoardMap } from "./types.ts";
import { DIRECTIONS } from "./constants.ts";

const LINE_REGEX = /[.#]+/;

const parseMap = (file: string[]): BoardMap =>
  cutBefore(file, (line) => line === "").reduce<BoardMap>(
    (map, line, y) => {
      const result = line.match(LINE_REGEX);

      if (!result) throw new Error(`Empty line ${y + 1} of board`);

      const firstX = line.indexOf(result[0]);
      const lastX = firstX + result[0].length - 1;

      return {
        lines: [...map.lines, [firstX, lastX]],
        walls: new Set([
          ...map.walls,
          ...line.allIndexesOf("#").map((i) => [i, y]),
        ]),
      };
    },
    {
      lines: [],
      walls: new Set(),
    }
  );

const parseSteps = (input: string): number[][] => {
  let dirIndex = 0;

  const values = input.split(/[LR]/).map(Number);
  const directionChanges = input
    .split(/\d+/)
    .filter((substr) => ["L", "R"].includes(substr))
    .map((letter) => (letter === "R" ? 1 : -1));

  return values.map((val, i) => {
    const step = DIRECTIONS[dirIndex.mod(4)].map((d) => d * val);
    dirIndex += directionChanges[i] ?? 0;
    return step;
  });
};

export const parseFile = (file: string[]): Board => {
  return {
    map: parseMap(file),
    steps: parseSteps(file.last()),
  };
};
