import { getAoCInput } from "../utils/file.ts";
import { parseFile } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";

const colorHashes = (str: string) =>
  str.replaceAll("#", "\x1b[1m\x1b[33m#\x1b[0m");

const main = async () => {
  const file = await getAoCInput(10);
  const data = parseFile(file);

  console.log(`La solution au problème 1 est ${solveProblem1(data)}`);
  console.log(`La solution au problème 2 est :
${colorHashes(solveProblem2(data))}`);
};

main();
