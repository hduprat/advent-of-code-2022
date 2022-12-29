type Direction = "N" | "NW" | "W" | "SW" | "S" | "SE" | "E" | "NE";
const DIRECTIONS: Direction[] = [
  "NE",
  "N",
  "NW",
  "W",
  "SW",
  "S",
  "SE",
  "E",
  "NE",
];

export const keyOf = (p: number[]): string => p.join(",");
export const coordsOf = (p: string): number[] => p.split(",").map(Number);

const getAdjacentPosition = (pos: string, direction: Direction): string => {
  const [x, y] = coordsOf(pos);
  const dy = direction.includes("N") ? -1 : direction.includes("S") ? 1 : 0;

  const dx = direction.includes("W") ? -1 : direction.includes("E") ? 1 : 0;

  return keyOf([x + dx, y + dy]);
};

export class ElfMap {
  private elves: Set<string>;
  public moveCount = 0;
  private directionProposals: Direction[];

  private proposeDirection(elf: string): string {
    if (DIRECTIONS.every((d) => !this.elves.has(getAdjacentPosition(elf, d))))
      return elf;

    for (const direction of this.directionProposals) {
      const directionsToSee = [-1, 0, 1].map((i) => {
        const dirIndex = DIRECTIONS.indexOf(direction);
        if (dirIndex < 0) throw new Error("Illicit direction");
        return DIRECTIONS[i + dirIndex];
      });

      if (this.elves.has(getAdjacentPosition(elf, directionsToSee[0])))
        continue;
      if (this.elves.has(getAdjacentPosition(elf, directionsToSee[1])))
        continue;
      if (this.elves.has(getAdjacentPosition(elf, directionsToSee[2])))
        continue;

      return getAdjacentPosition(elf, direction);
    }

    return elf;
  }

  constructor(_elves: Set<string>) {
    this.elves = new Set(_elves);
    this.directionProposals = ["N", "S", "W", "E"];
  }

  public move(): this {
    const propositions = new Map<string, string[]>();
    for (const elf of this.elves) {
      const proposedPosition = this.proposeDirection(elf);
      propositions.set(proposedPosition, [
        ...(propositions.get(proposedPosition) ?? []),
        elf,
      ]);
    }

    for (const [newPosition, elvesMovingHere] of propositions) {
      if (elvesMovingHere.length === 1) {
        this.elves.delete(elvesMovingHere[0]);
        this.elves.add(newPosition);
      }
    }

    this.moveCount++;

    const firstDirection = this.directionProposals.shift();
    if (!firstDirection) throw new Error("Illicit direction");
    this.directionProposals.push(firstDirection);

    return this;
  }

  public moveUntil(n: number): this {
    while (this.moveCount < n) {
      this.move();
    }

    return this;
  }

  public moveUntilStops(): this {
    while (this.moveCount < Number.MAX_VALUE) {
      const previousPositions = new Set(this.elves);
      this.move();
      for (const pos of this.elves) {
        previousPositions.delete(pos);
      }

      if (previousPositions.size === 0) return this;
    }

    return this;
  }

  public getElves(): Set<string> {
    return new Set(this.elves);
  }

  public get emptySpaces(): number {
    const elvesX = [...this.elves].map((pos) => coordsOf(pos)[0]);
    const elvesY = [...this.elves].map((pos) => coordsOf(pos)[1]);

    let emptySpaces = 0;

    for (let y = Math.min(...elvesY); y <= Math.max(...elvesY); y++) {
      for (let x = Math.min(...elvesX); x <= Math.max(...elvesX); x++) {
        if (!this.elves.has(keyOf([x, y]))) emptySpaces++;
      }
    }

    return emptySpaces;
  }

  public draw() {
    const elvesX = [...this.elves].map((pos) => coordsOf(pos)[0]);
    const elvesY = [...this.elves].map((pos) => coordsOf(pos)[1]);

    for (let y = Math.min(...elvesY); y <= Math.max(...elvesY); y++) {
      let line = "";
      for (let x = Math.min(...elvesX); x <= Math.max(...elvesX); x++) {
        if (this.elves.has(keyOf([x, y]))) line += "#";
        else line += ".";
      }
      console.log(line + "\n");
    }

    console.log("\n");
  }
}
