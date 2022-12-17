import { getAoCInput } from "../utils/file.ts";
import { parseFile } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";

const main = async () => {
  const file = await getAoCInput(15);
  const data = parseFile(file);

  console.log(`La solution au problème 1 est ${solveProblem1(data, 2000000)}`);
  console.log(`La solution au problème 2 est ${solveProblem2(data, 4000000)}`);
};

main();
