import { OpenAI } from "langchain-gpt4all/llms/openai";
import { PromptTemplate } from "langchain-gpt4all/prompts";
import { LLMChain } from "langchain-gpt4all/chains";

export const run = async () => {
  const model = new OpenAI({
    temperature: 0.9,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token: string) {
          console.log({ token });
        },
      },
    ],
  });

  const template = "What is a good name for a company that makes {product}?";
  const prompt = new PromptTemplate({ template, inputVariables: ["product"] });
  const chain = new LLMChain({ llm: model, prompt });
  const res = await chain.call({ product: "colorful socks" });
  console.log({ res });
};
