import {
  generateBurstPattern,
  generatePattern,
  generatePeriodPattern,
} from "../patterns/generatePattern";
import { patternToString } from "../patterns/patternToString";
import { Pattern } from "../patterns/types";
import { randInt } from "../util";

export type Composition = {
  pattern: Pattern;
  periodPattern: Pattern;
  synthChan: number;
  periodSynthChan: number;
  burstPattern: Pattern;
};

let composition: Composition;

export const createInitialComposition = () => {
  const pattern = generatePattern({});
  const periodPattern = generatePeriodPattern();
  const burstPattern = generateBurstPattern();
  composition = {
    pattern,
    periodPattern,
    synthChan: randInt(0, 15),
    periodSynthChan: randInt(0, 15),
    burstPattern,
  };
};

export const updateComposition = (
  fieldsToUpdate: Partial<Composition>
): Composition => {
  composition = { ...composition, ...fieldsToUpdate };
  return composition;
};

export const getTidal = () => {
  const { pattern, synthChan, periodPattern, periodSynthChan, burstPattern } =
    composition;
  const patternString = patternToString(pattern);
  const periodPatternString = patternToString(periodPattern);
  const burstPatternString = patternToString(burstPattern);
  return `do
  let burstStruct = struct "{1}%16"
  let pat = "${patternString}"
  let periodPat = "${periodPatternString}"
  let burstPat = "${burstPatternString}"
  d1 $
    stack [
      -- main synth
      mask (inv periodPat) $ while burstPat (burstStruct) $ struct pat $ s "harmor" # midichan ${synthChan} # amp 1
      , mask (periodPat) $ while burstPat (burstStruct) $ struct pat $ s "harmor" # midichan ${synthChan} # amp 0.1
      -- period synth
      , mask (periodPat) $ struct pat $ s "harmor" # midichan ${periodSynthChan} # amp 1
      , mask (periodPat) $ struct pat $ s "harmor" # midichan ${periodSynthChan} # amp 0.1
      -- kick
      , mask (inv periodPat) $ while burstPat (burstStruct) $ struct pat $ s "drums" # midichan 0 # amp 1
      -- clap
      , mask (periodPat) $ struct pat $ s "drums" # midichan 3 # amp 1
    ] # cps 1`;
};
