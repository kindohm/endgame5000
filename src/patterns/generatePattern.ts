import { randInt } from "../util";
import { MultPattern, Pattern, PliesPattern } from "./types";

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

export const generateMultPattern = ({
  center,
  spread,
}: GenerateOptions): MultPattern => {
  const len = 8; //length ?? randInt(2, 8);
  const cen = center ?? randInt(2, 6);
  const spr = spread ?? randInt(1, 6);
  const mults = new Array(len).fill(null).map(() => {
    return {
      length: Math.max(cen + randInt(-spr, spr), 1),
      mult: 0.5,
    };
  });

  return { mults, length: len };
};

export const generatePliesPattern = (): PliesPattern => {
  const plies = new Array(8).fill(null).map(() => {
    return { repeats: 0, length: 1 };
  });

  return { length: 8, plies };
};
