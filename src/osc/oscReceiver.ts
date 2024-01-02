// eslint-disable-next-line @typescript-eslint/no-var-requires
const osc = require("osc");
import { OscMessage } from "./oscTypes";
import play from "./commands/play";
import step from "./commands/step";
import numSteps from "./commands/numSteps";
import period from "./commands/period";
import iterProb from "./commands/iterProb";
import revProb from "./commands/revProb";
import iterType from "./commands/iterType";
import cpsStep from "./commands/cpsStep";
import cpsMultMin from "./commands/cpsMultMin";
import cpsMultMax from "./commands/cpsMultMax";
import plies from "./commands/plies";

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
  "/iterProb": iterProb,
  "/revProb": revProb,
  "/iterType": iterType,
  "/cpsStep1": cpsStep,
  "/cpsStep2": cpsStep,
  "/cpsStep3": cpsStep,
  "/cpsStep4": cpsStep,
  "/cpsStep5": cpsStep,
  "/cpsStep6": cpsStep,
  "/cpsStep7": cpsStep,
  "/cpsStep8": cpsStep,
  "/cpsMultMin": cpsMultMin,
  "/cpsMultMax": cpsMultMax,
  "/plies1": plies,
  "/plies2": plies,
  "/plies3": plies,
  "/plies4": plies,
  "/plies5": plies,
  "/plies6": plies,
  "/plies7": plies,
  "/plies8": plies,
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

  // console.log("msg", oscMsg);

  if (commandMap[address]) {
    commandMap[address](oscMsg);
  }
});

const run = () => {
  udpPort.open();
  console.log(`UDP port opened\nreceiving OSC on ${port}`);
};

export { run };
