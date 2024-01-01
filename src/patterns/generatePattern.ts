import { randInt } from "../util";
import { Pattern } from "./types";

type GenerateOptions = {
  length?: number;
  center?: number;
  spread?: number;
};

export const generatePattern = ({
  length,
  center,
  spread,
}: GenerateOptions): Pattern => {
  const len = length ?? randInt(3, 8);
  const cen = center ?? randInt(2, 6);
  const spr = spread ?? randInt(1, 6);
  const hits = new Array(len).fill(null).map(() => {
    return {
      length: Math.max(cen + randInt(-spr, spr), 1),
      period: false,
    };
  });

  return { hits };
};
