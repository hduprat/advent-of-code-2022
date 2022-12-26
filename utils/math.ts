/**
 * Always returns a positive integer.
 */
export const mod = (n: number, d: number): number => {
  return ((n % d) + d) % d;
};
