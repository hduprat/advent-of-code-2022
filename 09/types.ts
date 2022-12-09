import { Point } from "../utils/point.ts";

export type Direction = "up" | "down" | "left" | "right";

export interface Move {
  direction: Direction;
  stepCount: number;
}

export interface State {
  knots: Point[];
  tailPositions: Point[];
}

export type Reducer = (state: State, step: Direction) => State;
