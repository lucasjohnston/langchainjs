import { ChatAnthropic } from "langchain-gpt4all/chat_models/anthropic";

const model = new ChatAnthropic({
  temperature: 0.9,
  apiKey: "YOUR-API-KEY", // In Node.js defaults to process.env.ANTHROPIC_API_KEY
});
