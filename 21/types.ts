type Operation = "+" | "-" | "*" | "/";

export interface ValueMonke {
  type: "value";
  value: number;
}

export interface OperatorMonke {
  type: "operator";
  operator: Operation;
  leftOp: string;
  rightOp: string;
}

export type Monke = ValueMonke | OperatorMonke;
