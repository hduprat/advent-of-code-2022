import { mapSum, sum } from "../utils/array.ts";
import { FileSystem } from "./types.ts";

export const getDirectoryTotalSize = (
  dir: string,
  fileSystem: FileSystem
): number => {
  const { tree, sizes } = fileSystem;

  const children = tree.get(dir);
  if (!children) {
    return sizes.get(dir) ?? 0; // because dir is likely to be a file
  }

  const totalSize = mapSum([...children], (child) =>
    getDirectoryTotalSize(child, fileSystem)
  );
  return totalSize;
};

export const solveProblem1 = (fileSystem: FileSystem): number => {
  const { tree } = fileSystem;
  const dirs = [...tree.keys()];

  return sum(
    dirs
      .map((dir) => getDirectoryTotalSize(dir, fileSystem))
      .filter((size) => size <= 100_000)
  );
};

export const solveProblem2 = (fileSystem: FileSystem): number => {
  const MAX_SPACE = 70_000_000;
  const NEEDED_FREE_SPACE = 30_000_000;

  const totalUsedSpace = getDirectoryTotalSize("", fileSystem);
  const freeSpace = MAX_SPACE - totalUsedSpace;
  const spaceToFree = NEEDED_FREE_SPACE - freeSpace;

  const dirs = [...fileSystem.tree.keys()];
  const deletableDirs = dirs
    .map((dir) => getDirectoryTotalSize(dir, fileSystem))
    .filter((size) => size >= spaceToFree)
    .toSorted((a, b) => a - b);

  return deletableDirs[0];
};
