import { CheerioWebBaseLoader } from "langchain-gpt4all/document_loaders/web/cheerio";

export const run = async () => {
  const loader = new CheerioWebBaseLoader(
    "https://news.ycombinator.com/item?id=34817881"
  );
  const docs = await loader.load();
  console.log({ docs });
};
