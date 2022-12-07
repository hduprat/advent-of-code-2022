export interface FileSystem {
  tree: Map<string, Set<string>>;
  sizes: Map<string, number>;
}
