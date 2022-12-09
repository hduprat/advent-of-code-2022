import { lastOf } from "../utils/array.ts";
import { infiniteNorm, Point } from "../utils/point.ts";
import { Direction, Move, Reducer, State } from "./types.ts";

const displacementMap: Record<Direction, (point: Point) => Point> = {
  down: ({ x, y }) => ({ x, y: y - 1 }),
  up: ({ x, y }) => ({ x, y: y + 1 }),
  left: ({ x, y }) => ({ x: x - 1, y }),
  right: ({ x, y }) => ({ x: x + 1, y }),
};

const areTouching = (head: Point, tail: Point): boolean =>
  infiniteNorm(head, tail) <= 1;

const adjustTail = (head: Point, tail: Point): Point => {
  if (areTouching(head, tail)) return tail;

  return {
    x: tail.x + Math.sign(head.x - tail.x),
    y: tail.y + Math.sign(head.y - tail.y),
  };
};

export const reducer: Reducer = (state, step) => {
  const { knots, tailPositions } = state;

  const newKnots = knots.reduce<Point[]>((intermediates, knot) => {
    const lastIntermediate = lastOf(intermediates);
    if (!lastIntermediate) return [displacementMap[step](knots[0])];
    return [...intermediates, adjustTail(lastIntermediate, knot)];
  }, []);

  const newTail = lastOf(newKnots);

  return {
    ...state,
    knots: newKnots,
    tailPositions: newTail
      ? [
          ...tailPositions.filter(
            ({ x, y }) => newTail.x !== x || newTail.y !== y
          ),
          newTail,
        ]
      : tailPositions,
  };
};

const repeatedReducer = (r: Reducer, count: number): Reducer => {
  if (count <= 1) return r;
  return (state, step) => repeatedReducer(r, count - 1)(r(state, step), step);
};

const solveProblemFromState = (data: Move[], initialState: State): number => {
  const finalState = data.reduce((state, move) => {
    return repeatedReducer(reducer, move.stepCount)(state, move.direction);
  }, initialState);

  return finalState.tailPositions.length;
};

export const solveProblem1 = (data: Move[]): number =>
  solveProblemFromState(data, {
    knots: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    tailPositions: [{ x: 0, y: 0 }],
  });

export const solveProblem2 = (data: Move[]): number =>
  solveProblemFromState(data, {
    knots: Array(10).fill({ x: 0, y: 0 }),
    tailPositions: [{ x: 0, y: 0 }],
  });
