import { updateComposition } from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const cpsMultMin = (msg: OscMessage) => {
  const { args } = msg;
  updateComposition({ cpsMultMin: args[0].value as number });
};

export default cpsMultMin;
