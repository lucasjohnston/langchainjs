// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import all entrypoints to test, do not do this in your own app
import "../../entrypoints.js";

// Import a few things we'll use to test the exports
import { LLMChain } from "langchain-gpt4all/chains";
import { ChatOpenAI } from "langchain-gpt4all/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain-gpt4all/prompts";
import { OpenAI } from "langchain-gpt4all/llms/openai";
import { OpenAIEmbeddings } from "langchain-gpt4all/embeddings/openai";
import { CallbackManager } from "langchain-gpt4all/callbacks";
import { ChatAgent } from "langchain-gpt4all/agents";

import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  // Intantiate a few things to test the exports
  new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
  const emb = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });
  const agent = ChatAgent.fromLLMAndTools(new ChatOpenAI(), []);

  // Set up a streaming LLM
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const llm = new ChatOpenAI({
    streaming: true,
    callbackManager: CallbackManager.fromHandlers({
      handleLLMNewToken: async (token) => {
        await writer.ready;
        await writer.write(encoder.encode(`data: ${token}\n\n`));
      },
      handleLLMEnd: async () => {
        await writer.ready;
        await writer.close();
      },
      handleLLMError: async (e) => {
        await writer.ready;
        await writer.abort(e);
      },
    }),
  });

  // Test a chain + prompt + model
  const chain = new LLMChain({
    llm,
    prompt: ChatPromptTemplate.fromPromptMessages([
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]),
  });

  // Run the chain but don't await it, otherwise the response will start
  // only after the chain is done
  chain.run("hello").catch(console.error);

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
