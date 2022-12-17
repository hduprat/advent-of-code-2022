export interface Point {
  x: number;
  y: number;
}

export const infiniteNorm = (A: Point, B: Point): number =>
  Math.max(Math.abs(B.x - A.x), Math.abs(B.y - A.y));

export const oneNorm = (A: Point, B: Point): number =>
  Math.abs(B.x - A.x) + Math.abs(B.y - A.y);

export const add = (A: Point, B: Point): Point => ({
  x: A.x + B.x,
  y: A.y + B.y,
});

export const equal = (a: Point, b: Point): boolean => {
  return a.x === b.x && a.y === b.y;
};
