interface Hash {
  rock: number;
  jet: number;
  height: number;
  hash: string;
}

const rocks: [number, number][][] = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [1, 2],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 0],
  ],
  [
    [2, 2],
    [2, 1],
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 3],
    [0, 2],
    [0, 1],
    [0, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
];

const getRockWidth = (rock: [number, number][]): number => {
  return Math.max(...rock.map((coord) => coord[0])) + 1;
};

const getRockHeight = (rock: [number, number][]): number => {
  return Math.max(...rock.map((coord) => coord[1])) + 1;
};

const keyOf = (point: [number, number]): string => `${point[0]},${point[1]}`;
const coordOf = (key: string): number[] => key.split(",").map(Number);

export class RockFormation {
  map: Map<string, boolean> = new Map();
  height = 0;
  fallenRocks = 0;

  jets: (-1 | 1)[];
  tick = 0;

  hashes: Hash[] = [];
  cycle:
    | {
        rocks: number;
        height: number;
      }
    | undefined;

  constructor(jets: (-1 | 1)[]) {
    this.jets = [...jets];
  }

  computeNextX(rock: [number, number][], origin: number[]): number {
    const x = origin[0];
    const deltaX = this.jets[this.tick % this.jets.length];
    if (x + deltaX < 0) return x;
    if (x + deltaX + getRockWidth(rock) > 7) return x;
    if (
      rock.some((coord) => {
        if (this.map.has(keyOf([x + deltaX + coord[0], origin[1] + coord[1]])))
          return true;
      })
    )
      return x;
    return x + deltaX;
  }

  identifyCycle() {
    const hash = this.hash();

    const sameHash = this.hashes.find(
      (h) =>
        h.hash === hash.hash &&
        h.jet === hash.jet &&
        h.rock % rocks.length === hash.rock % rocks.length
    );

    if (sameHash) {
      console.log("WOW", {
        current: hash,
        sameas: sameHash,
      });

      this.cycle = {
        rocks: hash.rock - sameHash.rock,
        height: hash.height - sameHash.height,
      };
    }

    this.hashes.push(hash);
  }

  waitForFallenRock() {
    const fallingRock = rocks[this.fallenRocks % rocks.length];
    const fallingRockOrigin = [2, this.height + 3];
    let isRockStopped = false;
    while (!isRockStopped) {
      fallingRockOrigin[0] = this.computeNextX(fallingRock, fallingRockOrigin);

      const nextY = fallingRockOrigin[1] - 1;
      if (nextY < 0) isRockStopped = true;
      fallingRock.forEach((coord) => {
        if (
          this.map.has(
            keyOf([fallingRockOrigin[0] + coord[0], nextY + coord[1]])
          )
        )
          isRockStopped = true;
      });
      if (!isRockStopped) fallingRockOrigin[1] = nextY;
      this.tick++;
    }

    this.height = Math.max(
      fallingRockOrigin[1] + getRockHeight(fallingRock),
      this.height
    );

    fallingRock.forEach((coord) => {
      this.map.set(
        keyOf([
          fallingRockOrigin[0] + coord[0],
          fallingRockOrigin[1] + coord[1],
        ]),
        true
      );
    });

    this.cleanMap();
  }

  cleanMap() {
    const allMaxYs: number[] = [];
    for (let x = 0; x < 7; x++) {
      allMaxYs.push(
        Math.max(
          ...[...this.map.keys()]
            .map(coordOf)
            .filter((c) => c[0] === x)
            .map((c) => c[1])
        )
      );
    }
    const cleanBelowY = Math.min(...allMaxYs);

    [...this.map.keys()].forEach((key) => {
      const [_, py] = coordOf(key);
      if (py < cleanBelowY - 20) this.map.delete(key);
    });
  }

  hash(): {
    rock: number;
    jet: number;
    height: number;
    hash: string;
  } {
    const minY = Math.min(
      ...[...this.map.keys()].map(coordOf).map((c) => c[1])
    );

    const cols: string[] = [];
    for (let x = 0; x < 7; x++) {
      cols.push(
        [...this.map.keys()]
          .map(coordOf)
          .filter((c) => c[0] === x)
          .map((c) => c[1] - minY)
          .join(".")
      );
    }
    return {
      hash: cols.join("-"),
      rock: this.fallenRocks,
      jet: this.tick % this.jets.length,
      height: this.height,
    };
  }

  waitForFallenRocks(n: number) {
    while (this.fallenRocks < n && !this.cycle) {
      this.waitForFallenRock();
      this.identifyCycle();
      this.fallenRocks++;
    }

    if (!this.cycle) return;
    const remainingCycles = Math.floor(
      (n - this.fallenRocks) / this.cycle.rocks
    );

    this.fallenRocks += remainingCycles * this.cycle.rocks;
    const allHeightGained = remainingCycles * this.cycle.height;
    this.height += allHeightGained;

    [...this.map.keys()].forEach((key) => {
      const [x, y] = coordOf(key);
      this.map.delete(key);
      this.map.set(keyOf([x, y + allHeightGained]), true);
    });

    while (this.fallenRocks < n) {
      this.waitForFallenRock();
      this.fallenRocks++;
    }
  }
}
