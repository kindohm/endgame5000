import { updateComposition } from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const iterType = (msg: OscMessage) => {
  const { args } = msg;
  const iterType = args[0].value as number;
  updateComposition({ iterType });
};

export default iterType;
