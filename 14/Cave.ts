export class Cave {
  map = new Map<number, Set<number>>();
  floorY: number | null = null;

  constructor(map?: Map<number, Set<number>>, withFloor = false) {
    if (map) {
      this.map = new Map(map);
      if (withFloor)
        this.floorY =
          Math.max(...[...map.values()].map((depths) => Math.max(...depths))) +
          2;
    }
  }

  addSand(): this {
    if (this.at(500).has(0)) throw "Cannot add sand anymore";

    let x = 500;
    let y = 0;

    while (1) {
      if (this.floorY !== null && y === this.floorY - 1) {
        break;
      }

      if (!this.at(x).has(y + 1)) y++;
      else if (!this.at(x - 1).has(y + 1)) x--, y++;
      else if (!this.at(x + 1).has(y + 1)) x++, y++;
      else break;
    }

    this.addTo(x, y);

    return this;
  }

  copy(withFloor = false): Cave {
    return new Cave(
      new Map([...this.map.entries()].map(([k, v]) => [k, new Set(v)])),
      withFloor
    );
  }

  at(x: number) {
    const depths = this.map.get(x);
    if (!depths) {
      if (this.floorY === null) throw new Error("Out of bounds");
      const newDepths = new Set<number>();
      this.map.set(x, newDepths);
      return newDepths;
    }
    return depths;
  }

  addTo(x: number, value: number) {
    this.at(x).add(value);
  }
}
