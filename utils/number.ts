declare global {
  interface Number {
    isBetween(a: number, b: number): boolean;
    mod(n: number): number;
  }
}

Number.prototype.isBetween = function (a, b) {
  if (this < Math.min(a, b)) return false;
  if (this > Math.max(a, b)) return false;
  return true;
};

Number.prototype.mod = function (n) {
  return ((this.valueOf() % n) + n) % n;
};

export {};
