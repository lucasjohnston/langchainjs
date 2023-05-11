import "@tensorflow/tfjs-backend-cpu";
import { Document } from "langchain-gpt4all/document";
import { TensorFlowEmbeddings } from "langchain-gpt4all/embeddings/tensorflow";
import { MemoryVectorStore } from "langchain-gpt4all/vectorstores/memory";

const embeddings = new TensorFlowEmbeddings();
const store = new MemoryVectorStore(embeddings);

const documents = [
  "A document",
  "Some other piece of text",
  "One more",
  "And another",
];

await store.addDocuments(
  documents.map((pageContent) => new Document({ pageContent }))
);
