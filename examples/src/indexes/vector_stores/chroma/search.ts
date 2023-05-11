import { Chroma } from "langchain-gpt4all/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain-gpt4all/embeddings/openai";

const vectorStore = await Chroma.fromExistingCollection(
  new OpenAIEmbeddings(),
  { collectionName: "godel-escher-bach" }
);

const response = await vectorStore.similaritySearch("scared", 2);
console.log(response);
/*
[
  Document { pageContent: 'Achilles: Oh, no!', metadata: {} },
  Document {
    pageContent: 'Achilles: Yiikes! What is that?',
    metadata: { id: 1 }
  }
]
*/
