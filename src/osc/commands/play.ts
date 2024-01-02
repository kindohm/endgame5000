import { updateComposition } from "../../composition/composition";
import { OscMessage } from "../oscTypes";

const play = (msg: OscMessage) => {
  const { args } = msg;
  const playing = args[0].value === 1;
  updateComposition({ playing });
};

export default play;
