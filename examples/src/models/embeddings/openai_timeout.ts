import { OpenAIEmbeddings } from "langchain-gpt4all/embeddings/openai";

export const run = async () => {
  const embeddings = new OpenAIEmbeddings({
    timeout: 1000, // 1s timeout
  });
  /* Embed queries */
  const res = await embeddings.embedQuery("Hello world");
  console.log(res);
  /* Embed documents */
  const documentRes = await embeddings.embedDocuments([
    "Hello world",
    "Bye bye",
  ]);
  console.log({ documentRes });
};
