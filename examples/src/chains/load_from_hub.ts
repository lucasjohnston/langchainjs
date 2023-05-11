import { loadChain } from "langchain-gpt4all/chains/load";

export const run = async () => {
  const chain = await loadChain("lc://chains/hello-world/chain.json");
  const res = chain.call({ topic: "foo" });
  console.log(res);
};
