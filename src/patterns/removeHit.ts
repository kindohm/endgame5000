import { randInt } from "../util";
import { Hit, Pattern } from "./types";

export const removeHit = (pattern: Pattern): Pattern => {
  const { hits } = pattern;
  if (hits.length === 1) return pattern;

  const index = randInt(0, hits.length - 1);

  const newHits = hits.reduce((acc: Hit[], h, i) => {
    if (i === index) {
      return acc;
    }
    return acc.concat(h);
  }, []);

  return { hits: newHits };
};
