import { Monke } from "./types.ts";

export const yell = (id: string, monkes: Map<string, Monke>): number => {
  const monke = monkes.get(id);
  if (!monke) throw new Error(`Monke ${id} does not exist and cannot yell`);

  switch (monke.type) {
    case "value":
      return monke.value;
    case "operator": {
      const leftValue = yell(monke.leftOp, monkes);
      const rightValue = yell(monke.rightOp, monkes);
      switch (monke.operator) {
        case "+":
          return leftValue + rightValue;
        case "-":
          return leftValue - rightValue;
        case "*":
          return leftValue * rightValue;
        case "/":
          return leftValue / rightValue;
      }
    }
  }
};

export const solveProblem1 = (data: Map<string, Monke>): number => {
  return yell("root", data);
};

const isParent = (id: string, monke: Monke): boolean =>
  monke.type === "operator" && (monke.leftOp === id || monke.rightOp === id);

export const fromHumnToRoot = (
  monkes: Map<string, Monke>
): Map<string, Monke> => {
  const route = new Map<string, Monke>();
  const monkesEntries = [...monkes.entries()];

  let id = "humn";

  while (id !== "root") {
    const parent = monkesEntries.find(([, monke]) => isParent(id, monke));
    if (!parent) throw new Error(`${id} is used nowhere`);
    const [parentId, parentMonke] = parent;

    if (parentId === "root") {
      route.set(id, {
        type: "value",
        value: 0,
      });
      id = "root";
      continue;
    }

    if (parentMonke.type !== "operator")
      throw new Error("Parent monke has to be an operator");

    if (parentMonke.leftOp === id) {
      switch (parentMonke.operator) {
        case "+":
          route.set(id, {
            type: "operator",
            operator: "-",
            leftOp: parentId,
            rightOp: parentMonke.rightOp,
          });
          break;
        case "*":
          route.set(id, {
            type: "operator",
            operator: "/",
            leftOp: parentId,
            rightOp: parentMonke.rightOp,
          });
          break;
        case "-":
          route.set(id, {
            type: "operator",
            operator: "+",
            leftOp: parentId,
            rightOp: parentMonke.rightOp,
          });
          break;
        case "/":
          route.set(id, {
            type: "operator",
            operator: "*",
            leftOp: parentId,
            rightOp: parentMonke.rightOp,
          });
          break;
      }
    } else {
      switch (parentMonke.operator) {
        case "+":
          route.set(id, {
            type: "operator",
            operator: "-",
            leftOp: parentId,
            rightOp: parentMonke.leftOp,
          });
          break;
        case "*":
          route.set(id, {
            type: "operator",
            operator: "/",
            leftOp: parentId,
            rightOp: parentMonke.leftOp,
          });
          break;
        case "-":
          route.set(id, {
            type: "operator",
            operator: "-",
            leftOp: parentMonke.leftOp,
            rightOp: parentId,
          });
          break;
        case "/":
          route.set(id, {
            type: "operator",
            operator: "/",
            leftOp: parentMonke.leftOp,
            rightOp: parentId,
          });
          break;
      }
    }
    id = parentId;
  }

  return route;
};

export const solveProblem2 = (data: Map<string, Monke>): number => {
  const route = fromHumnToRoot(data);

  // we add all the remaining nodes in order to be able to yell later
  [...data.entries()].forEach(([id, monke]) => {
    if (route.has(id)) return;
    route.set(id, monke);
  });

  const root = data.get("root");

  if (!root) throw new Error("No root");
  if (root.type !== "operator")
    throw new Error("Illicit root, should be an operator");

  const operandToSolve = route.has(root.leftOp) ? root.leftOp : root.rightOp;
  const monkeToSolve = route.get(operandToSolve);

  if (!monkeToSolve) throw new Error("Operand to solve is not in route");
  if (monkeToSolve.type !== "value")
    throw new Error("Operand to solve has to be a value");

  const constantOperand = route.has(root.leftOp) ? root.rightOp : root.leftOp;
  const constantValue = yell(constantOperand, data);
  monkeToSolve.value = constantValue;

  return yell("humn", route);
};
