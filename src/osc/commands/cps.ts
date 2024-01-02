import { updateComposition } from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const cps = (msg: OscMessage) => {
  const { args } = msg;
  updateComposition({ cps: args[0].value as number });
};

export default cps;
