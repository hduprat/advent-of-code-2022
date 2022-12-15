import { mapSum } from "../utils/array.ts";
import { PacketPair, SubPacket } from "./types.ts";

export const isInRightOrder = (
  left: SubPacket,
  right: SubPacket
): boolean | null => {
  if (typeof left === "number") {
    if (typeof right === "number") return left === right ? null : left < right;
    else return isInRightOrder([left], right);
  }

  if (typeof right === "number") return isInRightOrder(left, [right]);
  else {
    const firstLeft = left[0];
    const firstRight = right[0];
    if (firstLeft === undefined && firstRight === undefined) return null;
    if (firstLeft === undefined) return true;
    if (firstRight === undefined) return false;
    return (
      isInRightOrder(firstLeft, firstRight) ??
      isInRightOrder(left.slice(1), right.slice(1))
    );
  }
};

export const solveProblem1 = (data: PacketPair[]): number => {
  return mapSum(data, ({ left, right }, index) => {
    const order = isInRightOrder(left, right);
    if (order === null) throw new Error("perfectly identical :(");
    return order ? index + 1 : 0;
  });
};

export const sortPackets = (packets: SubPacket[][]): SubPacket[][] => {
  return packets.toSorted((left, right) => {
    const order = isInRightOrder(left, right);
    if (order === null) throw new Error("perfectly identical :(");
    return order ? -1 : 1;
  });
};

export const solveProblem2 = (data: PacketPair[]): number => {
  const decoderPackets = [[[2]], [[6]]];
  const unpairedPackets = data.flatMap(({ left, right }) => [left, right]);
  const sortedPackets = sortPackets([...unpairedPackets, ...decoderPackets]);
  return (
    (sortedPackets.indexOf(decoderPackets[0]) + 1) *
    (sortedPackets.indexOf(decoderPackets[1]) + 1)
  );
};
