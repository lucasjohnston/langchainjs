import { MemoryVectorStore } from "langchain-gpt4all/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain-gpt4all/embeddings/openai";
import { TextLoader } from "langchain-gpt4all/document_loaders/fs/text";

export const run = async () => {
  // Create docs with a loader
  const loader = new TextLoader(
    "src/document_loaders/example_data/example.txt"
  );
  const docs = await loader.load();

  // Load the docs into the vector store
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings()
  );

  // Search for the most similar document
  const resultOne = await vectorStore.similaritySearch("hello world", 1);

  console.log(resultOne);
};
