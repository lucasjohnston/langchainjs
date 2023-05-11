import { MongoVectorStore } from "langchain-gpt4all/vectorstores/mongo";
import { CohereEmbeddings } from "langchain-gpt4all/embeddings/cohere";
import { MongoClient } from "mongodb";

export const run = async () => {
  const client = new MongoClient(process.env.MONGO_URI || "");

  const collection = client.db("langchain-gpt4all").collection("test");

  const vectorStore = new MongoVectorStore(new CohereEmbeddings(), {
    client,
    collection,
    // indexName: "default", // make sure that this matches the index name in atlas if not using "default"
  });

  const resultOne = await vectorStore.similaritySearch("Hello world", 1);

  console.log(resultOne);

  // remember to close the client
  await client.close();
};
