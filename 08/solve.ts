import { mapSum } from "../utils/array.ts";

export const computeVisibilityMap = (heightMap: number[][]): boolean[][] =>
  heightMap.map((row, y) =>
    row.map((h, x) => {
      if (x === 0) return true;
      if (x === row.length - 1) return true;
      if (y === 0) return true;
      if (y === heightMap.length - 1) return true;
      if (row.slice(0, x).every((treeHeight) => treeHeight < h)) return true;
      if (row.slice(x + 1).every((treeHeight) => treeHeight < h)) return true;
      if (heightMap.slice(0, y).every((treeRow) => treeRow[x] < h)) return true;
      if (heightMap.slice(y + 1).every((treeRow) => treeRow[x] < h))
        return true;
      return false;
    })
  );

export const solveProblem1 = (data: number[][]): number => {
  const visibilityMap = computeVisibilityMap(data);
  return mapSum(visibilityMap, (row) =>
    mapSum(row, (isVisible) => (isVisible ? 1 : 0))
  );
};

const findDirectionalScenicScore = (
  directionalTrees: number[],
  height: number
): number => {
  const tallerTreeIndex = directionalTrees.findIndex(
    (treeHeight) => treeHeight >= height
  );
  if (tallerTreeIndex === -1) return directionalTrees.length; // no taller tree, scenic score to the max
  return tallerTreeIndex + 1;
};

export const computeScenicScore = (
  heightMap: number[][],
  coords: { x: number; y: number }
): number => {
  const { x, y } = coords;

  if (x === 0) return 0;
  if (x === heightMap[y].length - 1) return 0;
  if (y === 0) return 0;
  if (y === heightMap.length - 1) return 0;

  const h = heightMap[y][x];

  const scenicScoreToTheLeft = findDirectionalScenicScore(
    heightMap[y].slice(0, x).toReversed(),
    h
  );
  const scenicScoreToTheRight = findDirectionalScenicScore(
    heightMap[y].slice(x + 1),
    h
  );
  const scenicScoreAbove = findDirectionalScenicScore(
    heightMap
      .slice(0, y)
      .map((row) => row[x])
      .toReversed(),
    h
  );
  const scenicScoreBelow = findDirectionalScenicScore(
    heightMap.slice(y + 1).map((row) => row[x]),
    h
  );

  return (
    scenicScoreToTheLeft *
    scenicScoreToTheRight *
    scenicScoreAbove *
    scenicScoreBelow
  );
};

export const solveProblem2 = (data: number[][]): number => {
  const visibilityMap = computeVisibilityMap(data);

  return visibilityMap.reduce((highest, row, y) => {
    const highestInRow = row.reduce((currentHighestInRow, isVisible, x) => {
      if (!isVisible) return currentHighestInRow;
      const scenicScore = computeScenicScore(data, { x, y });
      return Math.max(scenicScore, currentHighestInRow);
    }, 0);
    return Math.max(highest, highestInRow);
  }, 0);
};
