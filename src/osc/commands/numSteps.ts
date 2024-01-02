import {
  getComposition,
  updateComposition,
} from "../../composition/composition";
import { convertRange } from "../../util";
import { OscMessage } from "../oscTypes";

const numSteps = (msg: OscMessage) => {
  const { args } = msg;
  const length = Math.floor(
    convertRange(args[0].value as number, [0, 1], [1, 8])
  );
  const { pattern } = getComposition();
  const newPattern = { ...pattern, length };
  updateComposition({ pattern: newPattern });
};

export default numSteps;
