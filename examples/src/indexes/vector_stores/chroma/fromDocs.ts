import { Chroma } from "langchain-gpt4all/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain-gpt4all/embeddings/openai";
import { TextLoader } from "langchain-gpt4all/document_loaders/fs/text";

// Create docs with a loader
const loader = new TextLoader("src/document_loaders/example_data/example.txt");
const docs = await loader.load();

// Create vector store and index the docs
const vectorStore = await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
  collectionName: "a-test-collection",
});

// Search for the most similar document
const response = await vectorStore.similaritySearch("hello", 1);

console.log(response);
/*
[
  Document {
    pageContent: 'Foo\nBar\nBaz\n\n',
    metadata: { source: 'src/document_loaders/example_data/example.txt' }
  }
]
*/
