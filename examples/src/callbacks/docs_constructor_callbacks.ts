import { ConsoleCallbackHandler } from "langchain-gpt4all/callbacks";
import { OpenAI } from "langchain-gpt4all/llms/openai";

const llm = new OpenAI({
  temperature: 0,
  // This handler will be used for all calls made with this LLM.
  callbacks: [new ConsoleCallbackHandler()],
});
