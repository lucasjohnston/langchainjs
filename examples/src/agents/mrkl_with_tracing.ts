import { OpenAI } from "langchain-gpt4all/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain-gpt4all/agents";
import { SerpAPI } from "langchain-gpt4all/tools";
import { Calculator } from "langchain-gpt4all/tools/calculator";
import process from "process";

export const run = async () => {
  process.env.LANGCHAIN_TRACING = "true";
  const model = new OpenAI({ temperature: 0 });
  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Austin,Texas,United States",
      hl: "en",
      gl: "us",
    }),
    new Calculator(),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
    verbose: true,
  });
  console.log("Loaded agent.");

  const input = `Who is Olivia Wilde's boyfriend? What is his current age raised to the 0.23 power?`;

  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });

  console.log(`Got output ${result.output}`);
};
