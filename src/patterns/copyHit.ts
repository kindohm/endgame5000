import { randInt } from "../util";
import { Hit, Pattern } from "./types";

export const copyHit = (pattern: Pattern, times?: number): Pattern => {
  const { hits } = pattern;
  const index = randInt(0, hits.length - 1);
  const newHits = hits.reduce((acc: Hit[], h, i) => {
    if (i !== index) {
      return acc.concat(h);
    }

    const copyArr = new Array(times ?? 1).fill(null).reduce(
      (acc2) => {
        return acc2.concat(h);
      },
      [h]
    );

    return acc.concat(copyArr);
  }, []);
  return { hits: newHits };
};
