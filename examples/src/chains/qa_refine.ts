import { loadQARefineChain } from "langchain-gpt4all/chains";
import { OpenAI } from "langchain-gpt4all/llms/openai";
import { TextLoader } from "langchain-gpt4all/document_loaders/fs/text";
import { MemoryVectorStore } from "langchain-gpt4all/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain-gpt4all/embeddings/openai";

export async function run() {
  // Create the models and chain
  const embeddings = new OpenAIEmbeddings();
  const model = new OpenAI({ temperature: 0 });
  const chain = loadQARefineChain(model);

  // Load the documents and create the vector store
  const loader = new TextLoader("./state_of_the_union.txt");
  const docs = await loader.loadAndSplit();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);

  // Select the relevant documents
  const question = "What did the president say about Justice Breyer";
  const relevantDocs = await store.similaritySearch(question);

  // Call the chain
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  });

  console.log(res);
  /*
  {
    output_text: '\n' +
      '\n' +
      "The president said that Justice Stephen Breyer has dedicated his life to serve this country and thanked him for his service. He also mentioned that Judge Ketanji Brown Jackson will continue Justice Breyer's legacy of excellence, and that the constitutional right affirmed in Roe v. Wade—standing precedent for half a century—is under attack as never before. He emphasized the importance of protecting access to health care, preserving a woman's right to choose, and advancing maternal health care in America. He also expressed his support for the LGBTQ+ community, and his commitment to protecting their rights, including offering a Unity Agenda for the Nation to beat the opioid epidemic, increase funding for prevention, treatment, harm reduction, and recovery, and strengthen the Violence Against Women Act."
  }
  */
}
