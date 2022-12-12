import { formGroups } from "../utils/array.ts";
import { Monke } from "./monke.ts";

const ITEMS_TEXT = "Starting items: ";
const DIVISOR_TEXT = "Test: divisible by ";
const TRUE_MONKE_TEXT = "If true: throw to monkey ";
const FALSE_MONKE_TEXT = "If false: throw to monkey ";

const oldOrNumber = (operand: string, old: number): number =>
  operand === "old" ? old : Number(operand);

export const parseFile = (file: string[]): Monke[] => {
  return formGroups(
    file.filter((line) => line.length > 0),
    6
  ).map((group, index) => {
    const items = group[1]
      .trim()
      .slice(ITEMS_TEXT.length)
      .split(/[\s,]+/)
      .map(Number);

    // 3 first words are always "Operation:", "new", and "="
    const [firstOperand, operator, secondOperand] = group[2]
      .trim()
      .split(" ")
      .slice(3);
    const operation = (old: number): number => {
      switch (operator) {
        case "+":
          return (
            oldOrNumber(firstOperand, old) + oldOrNumber(secondOperand, old)
          );
        case "*":
          return (
            oldOrNumber(firstOperand, old) * oldOrNumber(secondOperand, old)
          );
        default:
          throw new Error("Illicit operator");
      }
    };

    const divisor = parseInt(group[3].trim().slice(DIVISOR_TEXT.length));
    const trueNext = parseInt(group[4].trim().slice(TRUE_MONKE_TEXT.length));
    const falseNext = parseInt(group[5].trim().slice(FALSE_MONKE_TEXT.length));

    return new Monke({
      id: index,
      items,
      divisor,
      operation,
      trueNext,
      falseNext,
    });
  });
};
