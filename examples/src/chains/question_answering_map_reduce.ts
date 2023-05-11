import { OpenAI } from "langchain-gpt4all/llms/openai";
import { loadQAMapReduceChain } from "langchain-gpt4all/chains";
import { Document } from "langchain-gpt4all/document";

export const run = async () => {
  const model = new OpenAI({ temperature: 0 });
  const chain = loadQAMapReduceChain(model);
  const docs = [
    new Document({ pageContent: "harrison went to harvard" }),
    new Document({ pageContent: "ankush went to princeton" }),
  ];
  const res = await chain.call({
    input_documents: docs,
    question: "Where did harrison go to college",
  });
  console.log({ res });
};
