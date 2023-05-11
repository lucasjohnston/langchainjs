import { UnstructuredDirectoryLoader } from "langchain-gpt4all/document_loaders/fs/unstructured";

const options = {
  apiKey: "MY_API_KEY",
};

const loader = new UnstructuredDirectoryLoader(
  "langchain-gpt4all/src/document_loaders/tests/example_data",
  options
);
const docs = await loader.load();
