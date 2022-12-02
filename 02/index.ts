import { getAoCInput } from "../utils/file.ts";
import { parseFile, parseFileForStrategy } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";

const main = async () => {
  const file = await getAoCInput(2);
  const data = parseFile(file);

  console.log(`La solution au problème 1 est ${solveProblem1(data)}`);
  console.log(
    `La solution au problème 2 est ${solveProblem2(parseFileForStrategy(file))}`
  );
};

main();
