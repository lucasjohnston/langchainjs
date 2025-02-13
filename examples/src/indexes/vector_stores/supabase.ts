import { SupabaseVectorStore } from "langchain-gpt4all/vectorstores/supabase";
import { OpenAIEmbeddings } from "langchain-gpt4all/embeddings/openai";
import { createClient } from "@supabase/supabase-js";

// First, follow set-up instructions at
// https://js.langchain-gpt4all.com/docs/modules/indexes/vector_stores/integrations/supabase

const privateKey = process.env.SUPABASE_PRIVATE_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

export const run = async () => {
  const client = createClient(url, privateKey);

  const vectorStore = await SupabaseVectorStore.fromTexts(
    ["Hello world", "Bye bye", "What's this?"],
    [{ id: 2 }, { id: 1 }, { id: 3 }],
    new OpenAIEmbeddings(),
    {
      client,
      tableName: "documents",
      queryName: "match_documents",
    }
  );

  const resultOne = await vectorStore.similaritySearch("Hello world", 1);

  console.log(resultOne);
};
