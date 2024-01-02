const logLevel = process.env.LOG_LEVEL ?? "info";

console.log("log level", logLevel);

export const log = (message?: unknown, ...optionalParams: unknown[]) => {
  console.log(message, ...optionalParams);
};

export const logNoBreak = (message: string) => {
  process.stdout.write(message);
};

export const warn = (message?: unknown, ...optionalParams: unknown[]) => {
  console.warn(message, ...optionalParams);
};

export const error = (message?: unknown, ...optionalParams: unknown[]) => {
  console.error(message, ...optionalParams);
};

export const debug = (message?: unknown, ...optionalParams: unknown[]) => {
  ["debug", "silly"].includes(logLevel) &&
    console.log(message, ...optionalParams);
};

export const silly = (message?: unknown, ...optionalParams: unknown[]) => {
  logLevel === "silly" && console.log(message, ...optionalParams);
};
