import { PromptTemplate } from "langchain-gpt4all/prompts";
import { LLMChain } from "langchain-gpt4all/chains";
import { OpenAI } from "langchain-gpt4all/llms/openai";

const chain = new LLMChain({
  llm: new OpenAI({ temperature: 0 }),
  prompt: PromptTemplate.fromTemplate("Hello, world!"),
  // This will enable logging of all Chain *and* LLM events to the console.
  verbose: true,
});
