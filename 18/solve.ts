import { mapSum } from "../utils/array.ts";
import { oneNorm } from "../utils/pointNDim.ts";

const coordsOf = (key: string): number[] => key.split(",").map(Number);
const keyOf = (coords: number[]): string => coords.join(",");

const getMapLimits = (
  cubeMap: Set<string>
): {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
} => {
  const minX = Math.min(...[...cubeMap.keys()].map((k) => coordsOf(k)[0]));
  const maxX = Math.max(...[...cubeMap.keys()].map((k) => coordsOf(k)[0]));

  const minY = Math.min(...[...cubeMap.keys()].map((k) => coordsOf(k)[1]));
  const maxY = Math.max(...[...cubeMap.keys()].map((k) => coordsOf(k)[1]));

  const minZ = Math.min(...[...cubeMap.keys()].map((k) => coordsOf(k)[2]));
  const maxZ = Math.max(...[...cubeMap.keys()].map((k) => coordsOf(k)[2]));

  return { minX, maxX, minY, maxY, minZ, maxZ };
};

export const countAdjacent = (cube: string, cubeMap: Set<string>): number => {
  const cubeCoords = coordsOf(cube);
  const adjacentCubes = [...cubeMap.keys()].filter((key) => {
    const otherCubeCoords = coordsOf(key);
    return oneNorm(cubeCoords, otherCubeCoords) === 1;
  });
  return adjacentCubes.length;
};

export const solveProblem1 = (data: Set<string>): number => {
  return mapSum([...data.keys()], (cube) => 6 - countAdjacent(cube, data));
};

const DIRECTIONS = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
];

const getFloodMapFrom = (cubeMap: Set<string>): Set<string> => {
  const { minX, maxX, minY, maxY, minZ, maxZ } = getMapLimits(cubeMap);

  let floodMapSize;
  const floodMap = new Set([keyOf([minX, minY, minZ])]);

  do {
    floodMapSize = floodMap.size;
    [...floodMap.keys()].forEach((key) => {
      const [x, y, z] = coordsOf(key);

      DIRECTIONS.forEach(([dx, dy, dz]) => {
        if (x + dx < minX) return;
        if (x + dx > maxX) return;
        if (y + dy < minY) return;
        if (y + dy > maxY) return;
        if (z + dz < minZ) return;
        if (z + dz > maxZ) return;
        const position = keyOf([x + dx, y + dy, z + dz]);

        if (cubeMap.has(position)) return;
        floodMap.add(position);
      });
    });
  } while (floodMap.size !== floodMapSize);

  return floodMap;
};

export const solveProblem2 = (data: Set<string>): number => {
  const floodMap = getFloodMapFrom(data);
  const inverseFloodMap = new Set<string>();

  const { minX, maxX, minY, maxY, minZ, maxZ } = getMapLimits(floodMap);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        if (!floodMap.has(keyOf([x, y, z])))
          inverseFloodMap.add(keyOf([x, y, z]));
      }
    }
  }

  return solveProblem1(inverseFloodMap);
};
