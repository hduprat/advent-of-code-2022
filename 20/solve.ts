import { mod } from "../utils/math.ts";
import { SequenceNumber } from "./types.ts";

export const areSequenceNumbersEqual = (a: SequenceNumber, b: SequenceNumber) =>
  a.n === b.n && a.index === b.index;

const indexOf = (sn: SequenceNumber, seq: SequenceNumber[]): number =>
  seq.findIndex((seqNum) => areSequenceNumbersEqual(seqNum, sn));

export const mix = (
  sequence: SequenceNumber[],
  sn: SequenceNumber
): SequenceNumber[] => {
  const index = indexOf(sn, sequence);
  if (index < 0) throw new Error("The number is not in sequence");

  const { n } = sn;

  if (n === 0) return [...sequence];
  const intermediate = sequence.toSpliced(index, 1);

  const finalPosition = index + n - 1;

  const newIndex = mod(finalPosition, intermediate.length);
  return [
    ...intermediate.slice(0, newIndex + 1),
    sn,
    ...intermediate.slice(newIndex + 1),
  ];
};

export const mixAll = (
  sequence: SequenceNumber[],
  initialSequence: SequenceNumber[] = sequence
): SequenceNumber[] => {
  return initialSequence.reduce(
    (intermediate, sn) => mix(intermediate, sn),
    sequence
  );
};

export const mixAllNTimes = (
  sequence: SequenceNumber[],
  times: number,
  initialSequence: SequenceNumber[] = sequence
): SequenceNumber[] => {
  if (times === 0) return sequence;
  return mixAllNTimes(
    mixAll(sequence, initialSequence),
    times - 1,
    initialSequence
  );
};

export const solveProblem1 = (data: SequenceNumber[]): number => {
  const endSequence = mixAll(data);

  const zeroIndex = endSequence.findIndex((sn) => sn.n === 0);

  if (zeroIndex < 0) throw new Error("There should be a zero");
  const firstCoord = endSequence[(zeroIndex + 1000) % endSequence.length].n;
  const secondCoord = endSequence[(zeroIndex + 2000) % endSequence.length].n;
  const thirdCoord = endSequence[(zeroIndex + 3000) % endSequence.length].n;

  return firstCoord + secondCoord + thirdCoord;
};

export const solveProblem2 = (data: SequenceNumber[]): number => {
  const endSequence = mixAllNTimes(
    data.map((sn) => ({
      n: sn.n * 811589153,
      index: sn.index,
    })),
    10
  );

  const zeroIndex = endSequence.findIndex((sn) => sn.n === 0);

  if (zeroIndex < 0) throw new Error("There should be a zero");
  const firstCoord = endSequence[(zeroIndex + 1000) % endSequence.length].n;
  const secondCoord = endSequence[(zeroIndex + 2000) % endSequence.length].n;
  const thirdCoord = endSequence[(zeroIndex + 3000) % endSequence.length].n;

  return firstCoord + secondCoord + thirdCoord;
};
