import { Pattern } from "./types";

export const patternToString = (pattern: Pattern) => {
  return `{${pattern.hits
    .filter((h, i) => i < pattern.length)
    .map((h, i) =>
      i < pattern.length ? `${h.on ? "1" : "0"}@${h.length}` : ""
    )
    .join(" ")}}%16`;
};
