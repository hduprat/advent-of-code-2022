import "../utils/number.ts";
import "../utils/array.ts";
import { Board } from "./types.ts";

export const getInitialPosition = (board: Board): number[] => {
  return [board.map.lines[0][0], 0];
};

const moveHorizontal = (
  board: Board,
  options: { y: number; fx: number; tx: number }
): number => {
  const { y, fx, tx } = options;
  const direction = Math.sign(tx - fx);
  const [minX, maxX] = board.map.lines[y];
  const length = maxX - minX + 1;

  const walls = [...board.map.walls.keys()].filter(([, wy]) => wy === y);

  if (!tx.isBetween(minX, maxX)) {
    const tunnelWallsX = [0, direction].flatMap((i) =>
      walls.map(([wx]) => wx + i * length).sort((a, b) => direction * (a - b))
    );

    const wallXInPath = tunnelWallsX.find((wx) => wx.isBetween(fx, tx));

    return (
      ((wallXInPath ? wallXInPath - direction : tx) - minX).mod(length) + minX
    );
  }

  const wallXInPath = walls
    .map(([wx]) => wx)
    .sort((a, b) => direction * (a - b))
    .find((wx) => wx.isBetween(fx, tx));

  return wallXInPath ? wallXInPath - direction : tx;
};

const moveVertical = (
  board: Board,
  options: { x: number; fy: number; ty: number }
): number => {
  const { x, fy, ty } = options;
  const direction = Math.sign(ty - fy);
  const minY = board.map.lines.findIndex(([minX, maxX]) =>
    x.isBetween(minX, maxX)
  );
  const maxY = board.map.lines.findLastIndex(([minX, maxX]) =>
    x.isBetween(minX, maxX)
  );
  if (minY < 0) throw new Error("Illicit move column");
  if (maxY < 0) throw new Error("Illicit move column");

  const length = maxY - minY + 1;
  const walls = [...board.map.walls.keys()].filter(([wx]) => wx === x);

  if (!ty.isBetween(minY, maxY)) {
    const tunnelWallsY = [0, direction].flatMap((i) =>
      walls.map(([, wy]) => wy + i * length).sort((a, b) => direction * (a - b))
    );

    const wallYInPath = tunnelWallsY.find((wy) => wy.isBetween(fy, ty));

    return (
      ((wallYInPath ? wallYInPath - direction : ty) - minY).mod(length) + minY
    );
  }

  const wallYInPath = walls
    .map(([, wy]) => wy)
    .sort((a, b) => direction * (a - b))
    .find((wy) => wy.isBetween(fy, ty));

  return wallYInPath ? wallYInPath - direction : ty;
};

export const move = (
  board: Board,
  options: { from: number[]; stepNumber: number }
): number[] => {
  const { from, stepNumber } = options;
  const { steps } = board;

  const [vx, vy] = steps[stepNumber];
  const [fx, fy] = from;

  if (vy === 0) {
    const result = [moveHorizontal(board, { y: fy, fx, tx: fx + vx }), fy];
    return result;
  }

  const result = [fx, moveVertical(board, { x: fx, fy, ty: fy + vy })];
  return result;
};

export const moveWholePath = (
  board: Board,
  initialPoint: number[]
): number[] => {
  const { steps } = board;
  return steps.reduce((currentPoint, _step, i) => {
    return move(board, { from: currentPoint, stepNumber: i });
  }, initialPoint);
};

const getFacing = (step: number[]): number => {
  if (step[0] !== 0) {
    if (step[0] > 0) return 0;
    return 2;
  }

  if (step[1] > 0) return 1;
  return 3;
};

export const solveProblem1 = (data: Board): number => {
  const initialPoint = getInitialPosition(data);

  const [finalX, finalY] = moveWholePath(data, initialPoint);

  return 1000 * (finalY + 1) + 4 * (finalX + 1) + getFacing(data.steps.last());
};

export const solveProblem2 = (data: Board): number => {
  return 0;
};
