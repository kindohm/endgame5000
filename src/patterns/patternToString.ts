import { Composition } from "../composition/composition";
import { convertRange } from "../util";
import { Pattern } from "./types";

export const patternToString = (pattern: Pattern) => {
  return `{${pattern.hits
    .filter((h, i) => i < pattern.length)
    .map((h, i) =>
      i < pattern.length ? `${h.on ? "1" : "0"}@${h.length}` : ""
    )
    .join(" ")}}%16`;
};

export const cpsMultPatternToString = (composition: Composition) => {
  const { cpsMultPattern, cpsMultMax, cpsMultMin } = composition;

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
