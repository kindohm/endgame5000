import { Pattern } from "./types";

export const patternToString = (pattern: Pattern) => {
  return `{${pattern.hits
    .map((h) => `${h.on ? "1" : "0"}@${h.length}`)
    .join(" ")}}%16`;
};
