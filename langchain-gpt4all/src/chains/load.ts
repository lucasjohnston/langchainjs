import { BaseChain } from "./base.js";
import { loadFromHub } from "../util/hub.js";
import { FileLoader, LoadValues, loadFromFile } from "../util/load.js";
import { parseFileConfig } from "../util/parse.js";

const loadChainFromFile: FileLoader<BaseChain> = async (
  file: string,
  path: string,
  values: LoadValues = {}
) => {
  const serialized = parseFileConfig(file, path);
  return BaseChain.deserialize(serialized, values);
};

/**
 * Load a chain from {@link https://github.com/hwchase17/langchain-gpt4all-hub | LangchainHub} or local filesystem.
 *
 * @example
 * Loading from LangchainHub:
 * ```ts
 * import { loadChain } from "langchain-gpt4all/chains/load";
 * const chain = await loadChain("lc://chains/hello-world/chain.json");
 * const res = await chain.call({ topic: "my favorite color" });
 * ```
 *
 * @example
 * Loading from local filesystem:
 * ```ts
 * import { loadChain } from "langchain-gpt4all/chains/load";
 * const chain = await loadChain("/path/to/chain.json");
 * ```
 */
export const loadChain = async (
  uri: string,
  values: LoadValues = {}
): Promise<BaseChain> => {
  const hubResult = await loadFromHub(
    uri,
    loadChainFromFile,
    "chains",
    new Set(["json", "yaml"]),
    values
  );
  if (hubResult) {
    return hubResult;
  }

  return loadFromFile(uri, loadChainFromFile, values);
};
