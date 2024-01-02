import {
  getComposition,
  updateComposition,
} from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const plies = (msg: OscMessage) => {
  const { address, args } = msg;
  const { pliesPattern } = getComposition();
  const index = parseInt(address.substring(6)) - 1;
  const newPlies = pliesPattern.plies.map((ply, i) => {
    if (i === index) {
      const val = args[0].value as number;

      return {
        ...ply,
        repeats: val,
      };
    }

    return ply;
  });

  const newPattern = { ...pliesPattern, plies: newPlies };
  updateComposition({ pliesPattern: newPattern });
};

export default plies;
