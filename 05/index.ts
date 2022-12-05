import { getAoCInput } from "../utils/file.ts";
import { parseFile } from "./parse.ts";
import { solveProblem1, solveProblem2 } from "./solve.ts";

const main = async () => {
  const file = await getAoCInput(5);
  const { stacks, instructions } = parseFile(file);

  console.log(
    `La solution au problème 1 est ${solveProblem1(stacks, instructions)}`
  );
  console.log(
    `La solution au problème 2 est ${solveProblem2(stacks, instructions)}`
  );
};

main();
