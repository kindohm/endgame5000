import { updateComposition } from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const iterProb = (msg: OscMessage) => {
  const { args } = msg;
  const revProb = args[0].value as number;
  updateComposition({ revProb });
};

export default iterProb;
