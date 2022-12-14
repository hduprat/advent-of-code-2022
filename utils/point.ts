export interface Point {
  x: number;
  y: number;
}

export const infiniteNorm = (A: Point, B: Point): number =>
  Math.max(Math.abs(B.x - A.x), Math.abs(B.y - A.y));

export const add = (A: Point, B: Point): Point => ({
  x: A.x + B.x,
  y: A.y + B.y,
});
