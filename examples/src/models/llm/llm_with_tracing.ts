import { OpenAI } from "langchain-gpt4all/llms/openai";
import { ChatOpenAI } from "langchain-gpt4all/chat_models/openai";
import { SystemChatMessage, HumanChatMessage } from "langchain-gpt4all/schema";
import * as process from "process";

export const run = async () => {
  process.env.LANGCHAIN_HANDLER = "langchain-gpt4all";
  const model = new OpenAI({ temperature: 0.9 });
  const resA = await model.call(
    "What would be a good company name a company that makes colorful socks?"
  );
  console.log({ resA });

  const chat = new ChatOpenAI({ temperature: 0 });
  const system_message = new SystemChatMessage("You are to chat with a user.");
  const message = new HumanChatMessage("Hello!");
  const resB = await chat.call([system_message, message]);
  console.log({ resB });
};
