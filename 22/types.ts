export interface BoardMap {
  lines: number[][];
  walls: Set<number[]>;
}

export interface Board {
  map: BoardMap;
  steps: number[][];
}
