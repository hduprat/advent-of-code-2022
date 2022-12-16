import { window } from "../utils/array.ts";
import { Cave } from "./Cave.ts";

export const parseFile = (file: string[]): Cave => {
  const depthMap = new Map<number, Set<number>>();
  file.forEach((line) => {
    const pathPoints = line.split(" -> ").map((point) => {
      const [x, y] = point.split(",");
      return { x: Number(x), y: Number(y) };
    });

    const pathSegments = window(pathPoints, 2);

    pathSegments.forEach((seg) => {
      const [minX, maxX] = seg.map((point) => point.x).sort((a, b) => a - b);
      const [minY, maxY] = seg.map((point) => point.y).sort((a, b) => a - b);

      for (let x = minX; x <= maxX; x++) {
        if (!depthMap.has(x)) depthMap.set(x, new Set());
        for (let y = minY; y <= maxY; y++) {
          depthMap.get(x)?.add(y);
        }
      }
    });
  });
  return new Cave(depthMap);
};
