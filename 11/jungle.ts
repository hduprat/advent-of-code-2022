import { BaseMonke, Monke, WorryMonke } from "./monke.ts";

export class BaseJungle<M extends BaseMonke<unknown>> {
  monkes: M[];

  constructor(monkes: M[]) {
    this.monkes = monkes;
  }

  completeRound() {
    for (const monke of this.monkes) {
      while (monke.hasItems) {
        const { item, toMonke } = monke.inspectTopItem();
        this.monkes[toMonke].catchItem(item);
      }
    }
  }

  completeRounds(n: number) {
    for (let i = 0; i < n; i++) {
      this.completeRound();
    }
  }
}

export class Jungle extends BaseJungle<Monke> {
  constructor(monkes: Monke[]) {
    super(monkes.map((monke) => monke.copy()));
  }
}

const convertToModuloList = (n: number, biggestDivisor: number): number[] => {
  return Array.from({ length: biggestDivisor }, (_, index) => n % (index + 1));
};

export class WorryJungle extends BaseJungle<WorryMonke> {
  constructor(monkes: Monke[]) {
    const biggestDivisor = monkes
      .map((monke) => monke.divisor)
      .toSorted((a, b) => b - a)[0];

    super(
      monkes.map(
        (monke) =>
          new WorryMonke({
            id: monke.id,
            divisor: monke.divisor,
            operation: monke.operation,
            trueNext: monke.trueNext,
            falseNext: monke.falseNext,
            items: monke.items.map((item) =>
              convertToModuloList(item, biggestDivisor)
            ),
          })
      )
    );
  }
}
