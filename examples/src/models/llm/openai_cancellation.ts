import { OpenAI } from "langchain-gpt4all/llms/openai";

export const run = async () => {
  const model = new OpenAI({ temperature: 1 });

  const controller = new AbortController();

  // Call `controller.abort()` somewhere to cancel the request.

  const res = await model.call(
    "What would be a good company name a company that makes colorful socks?",
    {
      options: {
        signal: controller.signal,
      },
    }
  );

  console.log(res);
  /*
  '\n\nSocktastic Colors'
  */
};
