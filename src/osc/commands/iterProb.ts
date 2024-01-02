import { updateComposition } from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const iterProb = (msg: OscMessage) => {
  const { args } = msg;
  const iterProb = args[0].value as number;
  updateComposition({ iterProb });
};

export default iterProb;
