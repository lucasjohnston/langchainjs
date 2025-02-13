import { OpenAI } from "langchain-gpt4all/llms/openai";
import { AgentExecutor } from "langchain-gpt4all/agents";
import { loadAgent } from "langchain-gpt4all/agents/load";
import { SerpAPI } from "langchain-gpt4all/tools";
import { Calculator } from "langchain-gpt4all/tools/calculator";

export const run = async () => {
  const model = new OpenAI({ temperature: 0 });
  const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Austin,Texas,United States",
      hl: "en",
      gl: "us",
    }),
    new Calculator(),
  ];

  const agent = await loadAgent(
    "lc://agents/zero-shot-react-description/agent.json",
    { llm: model, tools }
  );
  console.log("Loaded agent from Langchain hub");

  const executor = AgentExecutor.fromAgentAndTools({
    agent,
    tools,
    returnIntermediateSteps: true,
  });

  const input = `Who is Olivia Wilde's boyfriend? What is his current age raised to the 0.23 power?`;
  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });

  console.log(`Got output ${result.output}`);
};
