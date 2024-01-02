import {
  getComposition,
  updateComposition,
} from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const cpsStep = (msg: OscMessage) => {
  const { address, args } = msg;
  const { cpsMultPattern } = getComposition();

  const index = parseInt(address.substring(8)) - 1;
  const newMults = cpsMultPattern.mults.map((mult, i) => {
    if (i === index) {
      return {
        ...mult,
        mult: args[0].value as number,
      };
    }

    return mult;
  });

  const newPattern = { ...cpsMultPattern, mults: newMults };
  updateComposition({ cpsMultPattern: newPattern });
};

export default cpsStep;
