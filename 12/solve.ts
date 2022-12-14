import { Point, add } from "../utils/point.ts";
import { HeightMap } from "./types.ts";

const directions: Point[] = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

const canWalkTo = (
  heightMap: HeightMap,
  params: { from: Point; to: Point }
): boolean => {
  const { from, to } = params;
  const fromHeight = heightMap.map[from.y]?.[from.x];
  const toHeight = heightMap.map[to.y]?.[to.x];
  if (!fromHeight || !toHeight) return false;

  return toHeight.charCodeAt(0) - fromHeight.charCodeAt(0) <= 1;
};

const getFloodMapFrom = (
  heightMap: HeightMap,
  startingPoint: Point,
  reverse: boolean = false
): (number | null)[][] => {
  const pathMap = heightMap.map.map((line) =>
    new Array<number | null>(line.length).fill(null)
  );

  pathMap[startingPoint.y][startingPoint.x] = 0;

  let positions = [startingPoint];
  let i = 1;
  do {
    positions = positions
      .flatMap((position) =>
        directions
          .map((d) => add(position, d))
          .filter(
            (p) =>
              // We cannot go back because it wouldn't be the smallest path, and we take the height issue in account
              pathMap[p.y]?.[p.x] === null &&
              canWalkTo(heightMap, {
                from: reverse ? p : position,
                to: reverse ? position : p,
              })
          )
      )
      .filter(({ x, y }) => {
        // fill path map AND remove duplicates at the same time!
        if (pathMap[y][x] === null) {
          pathMap[y][x] = i;
          return true;
        } else {
          return false;
        }
      });
    i++;
  } while (positions.length !== 0);

  return pathMap;
};

export const solveProblem1 = (heightMap: HeightMap): number => {
  const pathMap = getFloodMapFrom(heightMap, heightMap.start);

  return pathMap[heightMap.end.y][heightMap.end.x] ?? -1;
};

export const solveProblem2 = (heightMap: HeightMap): number => {
  const pathMap = getFloodMapFrom(heightMap, heightMap.end, true);
  const scoresFromBottom = pathMap.flatMap((row, y) =>
    row.filter(
      (score, x): score is number =>
        heightMap.map[y]?.[x] === "a" && score !== null
    )
  );

  return Math.min(...scoresFromBottom);
};
