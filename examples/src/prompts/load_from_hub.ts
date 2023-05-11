import { loadPrompt } from "langchain-gpt4all/prompts/load";

export const run = async () => {
  const prompt = await loadPrompt("lc://prompts/hello-world/prompt.yaml");
  const res = await prompt.format({});
  console.log({ res });
};
