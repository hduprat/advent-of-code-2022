export interface Point {
  x: number;
  y: number;
}

export const infiniteNorm = (A: Point, B: Point): number =>
  Math.max(Math.abs(B.x - A.x), Math.abs(B.y - A.y));
