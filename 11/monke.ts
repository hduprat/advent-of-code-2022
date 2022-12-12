export abstract class BaseMonke<Item> {
  id: number;
  items: Item[];
  operation: (old: number) => number;
  divisor: number;
  trueNext: number;
  falseNext: number;

  inspectCount = 0;

  get hasItems() {
    return this.items.length > 0;
  }

  abstract inspectTopItem(): { item: Item; toMonke: number };

  catchItem(item: Item) {
    this.items.push(item);
  }

  abstract copy(): BaseMonke<Item>;

  constructor(payload: {
    id: number;
    items: Item[];
    operation: (old: number) => number;
    divisor: number;
    trueNext: number;
    falseNext: number;
  }) {
    this.id = payload.id;
    this.items = payload.items;
    this.operation = payload.operation;
    this.divisor = payload.divisor;
    this.trueNext = payload.trueNext;
    this.falseNext = payload.falseNext;
  }
}

export class Monke extends BaseMonke<number> {
  inspectTopItem(): { item: number; toMonke: number } {
    const item = this.items.shift();
    if (!item) throw new Error("Monke has no item");

    const worryLevel = Math.floor(this.operation(item) / 3);

    this.inspectCount++;

    return {
      toMonke: worryLevel % this.divisor === 0 ? this.trueNext : this.falseNext,
      item: worryLevel,
    };
  }

  copy(): Monke {
    return new Monke({
      id: this.id,
      items: [...this.items],
      divisor: this.divisor,
      operation: this.operation,
      trueNext: this.trueNext,
      falseNext: this.falseNext,
    });
  }
}

export class WorryMonke extends BaseMonke<number[]> {
  inspectTopItem(): { item: number[]; toMonke: number } {
    const item = this.items.shift();
    if (!item) throw new Error("Monke has no item");

    const worryLevelAsModuloList = item.map(
      (modulo, index) => this.operation(modulo) % (index + 1)
    );
    if (worryLevelAsModuloList.length < this.divisor)
      throw new Error(
        "Illegal output, please check if you correctly calculated the biggest divisor of all monkes."
      );

    this.inspectCount++;

    return {
      toMonke:
        worryLevelAsModuloList[this.divisor - 1] === 0
          ? this.trueNext
          : this.falseNext,
      item: worryLevelAsModuloList,
    };
  }

  copy(): WorryMonke {
    return new WorryMonke({
      id: this.id,
      items: this.items.map((item) => [...item]),
      divisor: this.divisor,
      operation: this.operation,
      trueNext: this.trueNext,
      falseNext: this.falseNext,
    });
  }
}
