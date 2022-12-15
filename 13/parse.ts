import { formGroups } from "../utils/array.ts";
import { PacketPair, SubPacket } from "./types.ts";

const MINIMAL_BRACKET_REGEX = /\[([^\[\]]*?)\]/;

const unfold = (
  bracketMap: Map<string, string[]>,
  key: string
): SubPacket[] => {
  return (
    bracketMap.get(key)?.map((val) => {
      const n = Number(val);
      if (isNaN(n)) {
        return unfold(bracketMap, val);
      }
      return n;
    }) ?? []
  );
};

const parseSubPacket = (line: string): SubPacket[] => {
  const bracketMap: Map<string, string[]> = new Map<string, string[]>();

  let currentLine = line;
  let currentKey = "";

  while (MINIMAL_BRACKET_REGEX.test(currentLine)) {
    currentKey += "A";
    const result = currentLine.match(MINIMAL_BRACKET_REGEX);

    if (!result || result.length <= 1) break;
    bracketMap.set(currentKey, result[1] ? result[1].split(",") : []);
    currentLine = currentLine.replace(result[0], currentKey);
  }

  return unfold(bracketMap, currentKey);
};

export const parseFile = (file: string[]): PacketPair[] =>
  formGroups(file, 3).map((group) => ({
    left: parseSubPacket(group[0]),
    right: parseSubPacket(group[1]),
  }));
