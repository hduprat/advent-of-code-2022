import { FileSystem } from "./types.ts";

const LS_FILE_REGEX = /^(\d+) (.+)$/;

const addNewDirectory = (
  tree: Map<string, Set<string>>,
  options: { currentDir: string; targetDir: string }
) => {
  const { currentDir, targetDir } = options;
  if (!tree.has(currentDir)) tree.set(currentDir, new Set(targetDir));
  else tree.get(currentDir)?.add(targetDir);
  tree.set(targetDir, new Set());
};

const addNewFile = (
  tree: Map<string, Set<string>>,
  options: { currentDir: string; file: string }
) => {
  const { currentDir, file } = options;
  if (!tree.has(currentDir)) tree.set(currentDir, new Set(file));
  else tree.get(currentDir)?.add(file);
};

export const parseFile = (file: string[]): FileSystem => {
  const tree = new Map<string, Set<string>>([["", new Set()]]);
  const sizes = new Map<string, number>([["", 0]]);

  file.reduce(
    (history: string[], line: string) => {
      const currentDir = history.join("/");
      if (line.startsWith("$ ls")) return history;

      if (line.startsWith("$ cd ")) {
        const targetDir = line.slice(5);
        switch (targetDir) {
          case "/":
            return [""];
          case "..":
            return history.length === 1 ? history : history.slice(0, -1);
          default: {
            const targetPath = currentDir + "/" + targetDir;
            addNewDirectory(tree, {
              currentDir,
              targetDir: targetPath,
            });

            sizes.set(targetPath, 0);
            return [...history, targetDir];
          }
        }
      }

      if (line.startsWith("dir ")) {
        const subdir = currentDir + "/" + line.slice(4);
        addNewDirectory(tree, { currentDir, targetDir: subdir });
        sizes.set(subdir, 0);
        return history;
      }

      const results = line.match(LS_FILE_REGEX);
      if (results) {
        const [, size, name] = results;
        const file = currentDir + "/" + name;
        addNewFile(tree, { currentDir, file });
        sizes.set(file, Number(size));
      }
      return history;
    },
    [""]
  );

  return { tree, sizes };
};
