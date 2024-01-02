// import { log, logNoBreak } from "../logger";
import { send } from "./repl";

const COOL_DOWN_INTERVAL = 500;

let evaluating = false;
let last: string | null = null;

export const evaluate = async (code: string) => {
  if (evaluating) {
    // logNoBreak("🌶️");
    last = code;
    return;
  }
  evaluating = true;
  // console.log("sending....");
  await send(code);
  // console.log("sent.");
  setTimeout(async () => {
    if (last) {
      // console.log("there was a last");
      await send(last);
      last = null;
      // log("⛄️");
    }

    evaluating = false;
  }, COOL_DOWN_INTERVAL);
};
