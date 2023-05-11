---
hide_table_of_contents: true
---

# GitHub

This example goes over how to load data from a GitHub repository.
You can set the `GITHUB_ACCESS_TOKEN` environment variable to a GitHub access token to increase the rate limit and access private repositories.

```typescript
import { GithubRepoLoader } from "langchain-gpt4all/document_loaders/web/github";

const loader = new GithubRepoLoader(
  "https://github.com/lucasjohnston/langchainjs-gpt4all",
  { branch: "main", recursive: false, unknown: "warn" }
);
const docs = await loader.load();
```
