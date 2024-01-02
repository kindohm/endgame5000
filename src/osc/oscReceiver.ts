// eslint-disable-next-line @typescript-eslint/no-var-requires
const osc = require("osc");
import { OscMessage } from "./oscTypes";
import play from "./commands/play";
import step from "./commands/step";
import numSteps from "./commands/numSteps";
import period from "./commands/period";

const commandMap: Record<string, (msg: OscMessage) => void> = {
  "/play": play,
  "/numSteps": numSteps,
  "/period1": period,
  "/period2": period,
  "/period3": period,
  "/period4": period,
  "/period5": period,
  "/period6": period,
  "/period7": period,
  "/step1": step,
  "/step2": step,
  "/step3": step,
  "/step4": step,
  "/step5": step,
  "/step6": step,
  "/step7": step,
  "/step8": step,
};

const defaultPort = 5150;
const port = defaultPort;

export const udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0",
  localPort: port,
  metadata: true,
});

udpPort.on("message", function (oscMsg: OscMessage) {
  const { address } = oscMsg;

  if (address.startsWith("/dirt")) {
    return;
  }

  //console.log("msg", oscMsg);

  if (commandMap[address]) {
    commandMap[address](oscMsg);
  } else {
    // console.warn("No command!", address);
  }
});

const run = () => {
  udpPort.open();
  console.log(`UDP port opened\nreceiving OSC on ${port}`);
};

export { run };
