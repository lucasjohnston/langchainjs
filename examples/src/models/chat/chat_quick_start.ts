import { ChatOpenAI } from "langchain-gpt4all/chat_models/openai";
import { HumanChatMessage } from "langchain-gpt4all/schema";

export const run = async () => {
  const chat = new ChatOpenAI();
  // Pass in a list of messages to `call` to start a conversation. In this simple example, we only pass in one message.
  const response = await chat.call([
    new HumanChatMessage(
      "What is a good name for a company that makes colorful socks?"
    ),
  ]);
  console.log(response);
  // AIChatMessage { text: '\n\nRainbow Sox Co.' }
};
