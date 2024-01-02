import {
  getComposition,
  updateComposition,
} from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const period = (msg: OscMessage) => {
  const { address, args } = msg;
  const { pattern } = getComposition();
  const index = parseInt(address.substring(7)) - 1;
  const on = args[0].value === 0; // yes, 0 == on
  const newHits = pattern.hits.map((hit, i) => {
    return { ...hit, on: i === index ? on : hit.on };
  });
  const newPattern = { ...pattern, hits: newHits };
  updateComposition({ ...pattern, pattern: newPattern });
};

export default period;
