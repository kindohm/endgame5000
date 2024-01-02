import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import split2 from "split2";
import { EOL } from "os";
import commands from "./bootCommands";
import { killGhci } from "./killGhci";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { log, error, warn, debug, silly } from "./../logger";

let ghciProcess: ChildProcessWithoutNullStreams;
let booted: boolean;
const stdErr: string[] = [];
const stdOut: string[] = [];
let stdTimer: NodeJS.Timeout;
const logStdOut: boolean = false;

const startGhci = async () => {
  log("checking for existing ghci processes...");
  const existingGhci = await killGhci();

  if (existingGhci) {
    log("# of instances killed:", existingGhci);
  } else {
    log("all is peaceful", "🕊️");
  }

  const ghciOptions = ["-XOverloadedStrings"];
  ghciProcess = spawn("ghci", ghciOptions);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ghciProcess.stderr.pipe(split2()).on("data", (data: any) => {
    logError(data.toString("utf8"));
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ghciProcess.stdout.on("data", (data: any) => {
    logProcessInfo(data.toString("utf8"));
  });
};

const logProcessInfo = (text: string) => {
  stdOut.push(text);
  processStd();
};

const logError = (text: string) => {
  stdErr.push(text);
  processStd();
};

const processStd = () => {
  clearTimeout(stdTimer);
  // defers the handler of stdOut/stdErr data
  // by some arbitrary ammount of time (50ms)
  // to get the buffer filled completly
  stdTimer = setTimeout(() => flushStd(), 50);
};

const flushStd = () => {
  if (stdErr.length) {
    const output = stdErr.join("");
    // process.stderr.write(output);
    error(output);
    stdErr.length = 0;
  }

  if (stdOut.length) {
    const output = stdOut.join(" ");
    logStdOut && log(output); // process.stdout.write(`${output}`);
    stdOut.length = 0;
  }
};

const getBootLines = () => {
  return commands.split("\n");
};

const boot = async () => {
  if (booted) {
    warn("tidal was already booted");
    return;
  }

  log("booting tidal");

  silly("starting ghci");
  await startGhci();

  silly("getting boot lines");
  const bootCommands = getBootLines();

  silly("running boot commands");
  for (let i = 0; i < bootCommands.length; i++) {
    ghciProcess.stdin.write(`${bootCommands[i]}${EOL}`);
  }

  log("tidal is booted", "🌊");
  booted = true;
};

export const send = async (tidalCode: string) => {
  if (!booted) {
    await boot();
  }
  writeBlock(tidalCode);
};

const writeLine = (command: string) => {
  ghciProcess.stdin.write(`${command}${EOL}`);
};

const writeBlock = (block: string) => {
  const parts = block.split(EOL);
  writeLine(":{");
  parts.forEach((part) => {
    writeLine(part);
  });
  writeLine(":}");
};
