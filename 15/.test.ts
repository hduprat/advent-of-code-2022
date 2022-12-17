import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import { describe, it } from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { parseFile } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";
import { Sensor } from "./Sensor.ts";

const inputFile: string[] = [
  "Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
  "Sensor at x=9, y=16: closest beacon is at x=10, y=16",
  "Sensor at x=13, y=2: closest beacon is at x=15, y=3",
  "Sensor at x=12, y=14: closest beacon is at x=10, y=16",
  "Sensor at x=10, y=20: closest beacon is at x=10, y=16",
  "Sensor at x=14, y=17: closest beacon is at x=10, y=16",
  "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
  "Sensor at x=2, y=0: closest beacon is at x=2, y=10",
  "Sensor at x=0, y=11: closest beacon is at x=2, y=10",
  "Sensor at x=20, y=14: closest beacon is at x=25, y=17",
  "Sensor at x=17, y=20: closest beacon is at x=21, y=22",
  "Sensor at x=16, y=7: closest beacon is at x=15, y=3",
  "Sensor at x=14, y=3: closest beacon is at x=15, y=3",
  "Sensor at x=20, y=1: closest beacon is at x=15, y=3",
];

const sensors: Sensor[] = [
  new Sensor({ position: { x: 2, y: 18 }, closestBeacon: { x: -2, y: 15 } }),
  new Sensor({ position: { x: 9, y: 16 }, closestBeacon: { x: 10, y: 16 } }),
  new Sensor({ position: { x: 13, y: 2 }, closestBeacon: { x: 15, y: 3 } }),
  new Sensor({ position: { x: 12, y: 14 }, closestBeacon: { x: 10, y: 16 } }),
  new Sensor({ position: { x: 10, y: 20 }, closestBeacon: { x: 10, y: 16 } }),
  new Sensor({ position: { x: 14, y: 17 }, closestBeacon: { x: 10, y: 16 } }),
  new Sensor({ position: { x: 8, y: 7 }, closestBeacon: { x: 2, y: 10 } }),
  new Sensor({ position: { x: 2, y: 0 }, closestBeacon: { x: 2, y: 10 } }),
  new Sensor({ position: { x: 0, y: 11 }, closestBeacon: { x: 2, y: 10 } }),
  new Sensor({ position: { x: 20, y: 14 }, closestBeacon: { x: 25, y: 17 } }),
  new Sensor({ position: { x: 17, y: 20 }, closestBeacon: { x: 21, y: 22 } }),
  new Sensor({ position: { x: 16, y: 7 }, closestBeacon: { x: 15, y: 3 } }),
  new Sensor({ position: { x: 14, y: 3 }, closestBeacon: { x: 15, y: 3 } }),
  new Sensor({ position: { x: 20, y: 1 }, closestBeacon: { x: 15, y: 3 } }),
];

describe("Day 15", () => {
  it("parses the file into a list of sensors", () => {
    assertEquals(parseFile(inputFile), sensors);
  });

  it("determines the no beacon zone for a sensor and a given y", () => {
    const sensor = sensors[6];

    assertEquals(sensor.noBeaconZone(10), [{ min: 3, max: 14 }]);
  });

  describe("Problem 1", () => {
    it("counts the number of positions that cannot contain a beacon for a given y line", () => {
      assertEquals(solveProblem1(sensors, 10), 26);
    });
  });

  describe("Problem 2", () => {
    it("finds the missing beacon's frequency", () => {
      assertEquals(solveProblem2(sensors, 20), 56000011);
    });
  });
});
