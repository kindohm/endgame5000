import {
  getComposition,
  updateComposition,
} from "../../composition/composition";
import { convertRange } from "../../util";
import { OscMessage } from "../oscTypes";

const step = (msg: OscMessage) => {
  const { address, args } = msg;
  const { pattern, cpsMultPattern, pliesPattern } = getComposition();

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

  const newMults = cpsMultPattern.mults.map((mult, i) => {
    if (i === index) {
      return {
        ...mult,
        length: Math.floor(
          convertRange(args[0].value as number, [0, 1], [1, 10])
        ),
      };
    }

    return mult;
  });

  const newPlies = pliesPattern.plies.map((ply, i) => {
    if (i === index) {
      return {
        ...ply,
        length: Math.floor(
          convertRange(args[0].value as number, [0, 1], [1, 10])
        ),
      };
    }

    return ply;
  });

  const newPattern = { ...pattern, hits: newHits };
  const newCpsMultPattern = { ...cpsMultPattern, mults: newMults };
  const newPliesPattern = { ...pliesPattern, plies: newPlies };
  updateComposition({
    pattern: newPattern,
    cpsMultPattern: newCpsMultPattern,
    pliesPattern: newPliesPattern,
  });
};

export default step;
