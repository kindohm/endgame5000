import { randInt, randItem } from "../util";
import { Pattern } from "./types";

export const nudgePattern = (pattern: Pattern): Pattern => {
  const { hits } = pattern;
  const index = randInt(0, hits.length - 1);
  const newHits = hits.map((h, i) => {
    if (i === index) {
      const opts = [
        Math.max(h.length - 2, 1),
        Math.max(h.length - 1, 1),
        Math.max(h.length - 1, 1),
        h.length + 1,
        h.length + 1,
        h.length + 2,
      ];
      return { length: randItem(opts) };
    }
    return h;
  });
  return { hits: newHits };
};
