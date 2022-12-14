import { HeightMap } from "./types.ts";

export const parseFile = (file: string[]): HeightMap => {
  return file.reduce<HeightMap>(
    (heightMap, line, y) => {
      const startIndex = line.indexOf("S");
      const endIndex = line.indexOf("E");
      return {
        map: [...heightMap.map, line.replace("S", "a").replace("E", "z")],
        start: startIndex >= 0 ? { x: startIndex, y } : heightMap.start,
        end: endIndex >= 0 ? { x: endIndex, y } : heightMap.end,
      };
    },
    {
      map: [],
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
    }
  );
};
