// Import a few things we'll use to test the exports
import { LLMChain } from "langchain-gpt4all/chains";
import { ChatOpenAI } from "langchain-gpt4all/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain-gpt4all/prompts";
import { CallbackManager } from "langchain-gpt4all/callbacks";

export function setupChain(element: HTMLButtonElement) {
  const runChain = async () => {
    const llm = new ChatOpenAI({
      // Don't do this in your app, it would leak your API key
      openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        handleLLMNewToken: async (token) =>
          console.log("handleLLMNewToken", token),
      }),
    });

    // Test count tokens
    const n = await llm.getNumTokens("Hello");
    console.log("getNumTokens", n);

    // Test a chain + prompt + model
    const chain = new LLMChain({
      llm,
      prompt: ChatPromptTemplate.fromPromptMessages([
        HumanMessagePromptTemplate.fromTemplate("{input}"),
      ]),
    });
    const res = await chain.run("hello");

    console.log("runChain", res);
  };
  element.addEventListener("click", runChain);
}
