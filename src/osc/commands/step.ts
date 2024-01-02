import {
  getComposition,
  updateComposition,
} from "../../composition/composition";
import { convertRange } from "../../util";
import { OscMessage } from "../oscTypes";

const step = (msg: OscMessage) => {
  const { address, args } = msg;
  const { pattern } = getComposition();

  const index = parseInt(address.substring(5)) - 1;
  const newHits = pattern.hits.map((hit, i) => {
    if (i === index) {
      return {
        ...hit,
        length: Math.floor(
          convertRange(args[0].value as number, [0, 1], [1, 10])
        ),
      };
    }

    return hit;
  });

  const newPattern = { ...pattern, hits: newHits };
  updateComposition({ pattern: newPattern });
};

export default step;
