import { updateComposition } from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const cpsMultMax = (msg: OscMessage) => {
  const { args } = msg;
  updateComposition({ cpsMultMax: args[0].value as number });
};

export default cpsMultMax;
