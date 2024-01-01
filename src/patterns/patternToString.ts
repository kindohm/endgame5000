import { Pattern } from "./types";

export const patternToString = (pattern: Pattern) => {
  return `{${pattern.hits.map((h) => `1@${h.length}`).join(" ")}}%16`;
};
