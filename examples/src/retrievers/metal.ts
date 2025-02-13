/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Metal from "@getmetal/metal-sdk";
import { MetalRetriever } from "langchain-gpt4all/retrievers/metal";

export const run = async () => {
  const MetalSDK = Metal.default;

  const client = new MetalSDK(
    process.env.METAL_API_KEY!,
    process.env.METAL_CLIENT_ID!,
    process.env.METAL_INDEX_ID
  );
  const retriever = new MetalRetriever({ client });

  const docs = await retriever.getRelevantDocuments("hello");

  console.log(docs);
};
