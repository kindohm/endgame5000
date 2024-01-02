import { randInt } from "../util";
import { Pattern } from "./types";

type GenerateOptions = {
  center?: number;
  spread?: number;
};

export const generatePattern = ({
  center,
  spread,
}: GenerateOptions): Pattern => {
  const len = 8; //length ?? randInt(2, 8);
  const cen = center ?? randInt(2, 6);
  const spr = spread ?? randInt(1, 6);
  const hits = new Array(len).fill(null).map(() => {
    return {
      length: Math.max(cen + randInt(-spr, spr), 1),
      on: true,
    };
  });

  return { hits, length: len };
};
