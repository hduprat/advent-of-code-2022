import { getAoCInput } from "../utils/file.ts";
import { parseFile } from "./parse.ts";
import { getCaloriesFromTop3Elves, getCaloriesFromTopElf } from "./solve.ts";

const main = async () => {
  const file = await getAoCInput(1);
  const elves = parseFile(file);

  console.log(`La solution au problème 1 est ${getCaloriesFromTopElf(elves)}`);
  console.log(
    `La solution au problème 2 est ${getCaloriesFromTop3Elves(elves)}`
  );
};

main();
