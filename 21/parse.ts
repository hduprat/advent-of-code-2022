import { Monke, OperatorMonke } from "./types.ts";

const OPERATION_REGEX = /^(\w+)\s([+-/*])\s(\w+)$/;

export const parseFile = (file: string[]): Map<string, Monke> => {
  const monkes = new Map<string, Monke>();

  file.forEach((line) => {
    const [id, rest] = line.split(": ");
    const operation = rest.match(OPERATION_REGEX);
    if (!operation) monkes.set(id, { type: "value", value: Number(rest) });
    else
      monkes.set(id, {
        type: "operator",
        leftOp: operation[1],
        operator: operation[2] as OperatorMonke["operator"],
        rightOp: operation[3],
      });
  });

  return monkes;
};
