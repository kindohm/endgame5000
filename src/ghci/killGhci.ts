/* eslint-disable @typescript-eslint/no-unused-vars */
import { exec } from "child_process";

export const killGhci = async () => {
  const query = `ghc-9.2.2`;
  return new Promise((res) => {
    const platform = process.platform;
    let cmd = "";
    switch (platform) {
      case "win32":
        cmd = `tasklist`;
        break;
      case "darwin":
        cmd = `ps -ax | grep ${query}`;
        break;
      case "linux":
        cmd = `ps -A`;
        break;
      default:
        break;
    }
    exec(cmd, (err, stdout, stdErr) => {
      const lines = stdout.split("\n").filter((l) => {
        return l.indexOf("grep ghc") < 0 && l !== "";
      });
      lines.forEach((l) => {
        const parts = l.split(" ");
        const pid = parseInt(parts[0]);
        console.log("killing", pid);
        process.kill(pid);
      });
      // res(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
      res(lines.length);
    });
  });
};
