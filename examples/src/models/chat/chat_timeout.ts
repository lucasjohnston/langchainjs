import { ChatOpenAI } from "langchain-gpt4all/chat_models/openai";
import { HumanChatMessage } from "langchain-gpt4all/schema";

export const run = async () => {
  const chat = new ChatOpenAI(
    { temperature: 1, timeout: 1000 } // 1s timeout
  );

  const response = await chat.call([
    new HumanChatMessage(
      "What is a good name for a company that makes colorful socks?"
    ),
  ]);
  console.log(response);
  // AIChatMessage { text: '\n\nRainbow Sox Co.' }
};
