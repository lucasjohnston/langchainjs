import hash from "object-hash";

/**
 * This cache key should be consistent across all versions of langchain-gpt4all.
 * It is currently NOT consistent across versions of langchain-gpt4all.
 *
 * A huge benefit of having a remote cache (like redis) is that you can
 * access the cache from different processes/machines. The allows you to
 * seperate concerns and scale horizontally.
 *
 * TODO: Make cache key consistent across versions of langchain-gpt4all.
 */
export const getCacheKey = (...strings: string[]): string =>
  hash(strings.join("_"));
