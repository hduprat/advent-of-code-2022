import { oneNorm, Point } from "../utils/point.ts";
import { Zone } from "../utils/zones.ts";

export class Sensor {
  position: Point;
  closestBeacon: Point;
  distanceToClosestBeacon: number;

  constructor(payload: { position: Point; closestBeacon: Point }) {
    this.position = payload.position;
    this.closestBeacon = payload.closestBeacon;
    this.distanceToClosestBeacon = oneNorm(this.position, this.closestBeacon);
  }

  noBeaconZone(y: number): Zone[] | undefined {
    const dy = Math.abs(this.position.y - y);
    if (dy > this.distanceToClosestBeacon) return undefined;
    const dx = this.distanceToClosestBeacon - dy;

    const minX = this.position.x - dx;
    const maxX = this.position.x + dx;
    const beaconX =
      this.closestBeacon.y === y ? this.closestBeacon.x : undefined;

    if (beaconX === undefined) return [{ min: minX, max: maxX }];
    if (beaconX === minX) return [{ min: minX + 1, max: maxX }];
    if (beaconX === maxX) return [{ min: minX, max: maxX - 1 }];

    return [
      { min: minX, max: beaconX - 1 },
      { min: beaconX + 1, max: maxX },
    ];
  }
}
