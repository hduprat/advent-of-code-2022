import { mapSum } from "../utils/array.ts";
import { equal, Point } from "../utils/point.ts";
import { remove, union, Zone } from "../utils/zones.ts";
import { Sensor } from "./Sensor.ts";

const computeNoBeaconZones = (sensors: Sensor[], y: number): Zone[] =>
  sensors.reduce<Zone[]>((zones, sensor) => {
    const sensorNoBeaconZones = sensor.noBeaconZone(y);
    if (sensorNoBeaconZones === undefined) return zones;
    return union([...zones, ...sensorNoBeaconZones]);
  }, []);

export const solveProblem1 = (data: Sensor[], y: number): number => {
  const noBeaconZones = computeNoBeaconZones(data, y);

  return mapSum(noBeaconZones, (zone) => zone.max - zone.min + 1);
};

export const solveProblem2 = (data: Sensor[], maxY: number): number => {
  const beacons = data.map((sensor) => sensor.closestBeacon);
  const missingBeacons: Point[] = [];
  for (let y = 0; y <= maxY; y++) {
    const rest = remove({ min: 0, max: maxY }, computeNoBeaconZones(data, y));
    rest.forEach((zone) => {
      for (let x = zone.min; x <= zone.max; x++) {
        if (!beacons.some((beacon) => equal(beacon, { x, y }))) {
          // beacon found!
          missingBeacons.push({ x, y });
        }
      }
    });
  }

  if (missingBeacons.length > 1)
    throw new Error("There should be only one missing beacon");
  const { x, y } = missingBeacons[0];

  console.log({ x, y });

  return 4000000 * x + y;
};
