import { Composition } from "../composition/composition";
import { convertRange } from "../util";
import { Pattern, PliesPattern } from "./types";

export const patternToString = (pattern: Pattern) => {
  return `{${pattern.hits
    .filter((h, i) => i < pattern.length)
    .map((h, i) =>
      i < pattern.length ? `${h.on ? "1" : "0"}@${h.length}` : ""
    )
    .join(" ")}}%16`;
};

export const cpsMultPatternToString = (composition: Composition) => {
  const { cpsMultPattern } = composition;

  return `{${cpsMultPattern.mults
    .filter((m, i) => i < cpsMultPattern.length)
    .map((m) => {
      const min = m.mult > 0.5 ? 1 : 0.25;
      const max = m.mult > 0.5 ? 2 : 1;
      console.log({ mult: m.mult, min, max });
      const mult =
        m.mult === 0.5 ? 1 : convertRange(m.mult, [0, 1], [min, max]);
      return `${mult.toFixed(2)}@${m.length}`;
    })
    .join(" ")}}%16`;
};

export const pliesPatternToString = (pattern: PliesPattern) => {
  const { length, plies } = pattern;

  return `plyWith "{${plies
    .filter((p, i) => i < length)
    .map((ply) => {
      const reps = convertRange(ply.repeats, [0, 1], [1, 10]);
      return `${Math.floor(reps)}@${ply.length}`;
    })
    .join(" ")}}%16" (# amp 0.5)`;
};
