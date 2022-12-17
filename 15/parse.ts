import { Sensor } from "./Sensor.ts";

const LINE_REGEX =
  /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;

export const parseFile = (file: string[]): Sensor[] => {
  return file.map((line) => {
    const result = line.match(LINE_REGEX);

    if (!result) throw new Error("Illegal line");

    const coordinates = result.slice(1).map(Number);
    if (coordinates.some((coord) => isNaN(coord)))
      throw new Error("Illegal argument");

    const [sx, sy, bx, by] = coordinates;
    return new Sensor({
      position: { x: sx, y: sy },
      closestBeacon: { x: bx, y: by },
    });
  });
};
