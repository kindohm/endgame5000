import { generatePattern } from "../patterns/generatePattern";
import { patternToString } from "../patterns/patternToString";
import { Pattern } from "../patterns/types";
import { randInt } from "../util";

export type Composition = {
  pattern: Pattern;
  synthChan: number;
};

let composition: Composition;

export const createInitialComposition = () => {
  const pattern = generatePattern({});
  composition = { pattern, synthChan: randInt(0, 15) };
};

export const updateComposition = (
  fieldsToUpdate: Partial<Composition>
): Composition => {
  composition = { ...composition, ...fieldsToUpdate };
  return composition;
};

export const getTidal = () => {
  const { pattern, synthChan } = composition;
  const patternString = patternToString(pattern);
  return `do
  let pat = "${patternString}"
  d1 $
    stack [
      struct pat $ s "harmor" # midichan ${synthChan} # amp 1
      , struct pat $ s "drums" # midichan 0 # amp 1
    ] # cps 1`;
};
