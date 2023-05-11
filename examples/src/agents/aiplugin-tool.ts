import { ChatOpenAI } from "langchain-gpt4all/chat_models/openai";
import { initializeAgentExecutorWithOptions } from "langchain-gpt4all/agents";
import {
  RequestsGetTool,
  RequestsPostTool,
  AIPluginTool,
} from "langchain-gpt4all/tools";

export const run = async () => {
  const tools = [
    new RequestsGetTool(),
    new RequestsPostTool(),
    await AIPluginTool.fromPluginUrl(
      "https://www.klarna.com/.well-known/ai-plugin.json"
    ),
  ];
  const agent = await initializeAgentExecutorWithOptions(
    tools,
    new ChatOpenAI({ temperature: 0 }),
    { agentType: "chat-zero-shot-react-description", verbose: true }
  );

  const result = await agent.call({
    input: "what t shirts are available in klarna?",
  });

  console.log({ result });
};
