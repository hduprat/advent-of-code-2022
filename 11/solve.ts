import { Jungle, WorryJungle } from "./jungle.ts";
import { Monke } from "./monke.ts";

export const solveProblem1 = (data: Monke[]): number => {
  const jungle = new Jungle(data);
  jungle.completeRounds(20);
  const [bestMonkeInspects, okayMonkeInspects] = jungle.monkes
    .map((monke) => monke.inspectCount)
    .toSorted((a, b) => b - a);
  return bestMonkeInspects * okayMonkeInspects;
};

export const solveProblem2 = (data: Monke[]): number => {
  const jungle = new WorryJungle(data);
  jungle.completeRounds(10000);
  const [bestMonkeInspects, okayMonkeInspects] = jungle.monkes
    .map((monke) => monke.inspectCount)
    .toSorted((a, b) => b - a);
  return bestMonkeInspects * okayMonkeInspects;
};
