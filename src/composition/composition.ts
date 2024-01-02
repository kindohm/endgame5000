import { evaluate } from "../ghci/evaluate";
import {
  generateMultPattern,
  generatePattern,
  generatePliesPattern,
} from "../patterns/generatePattern";
import {
  cpsMultPatternToString,
  patternToString,
  pliesPatternToString,
} from "../patterns/patternToString";
import { Pattern, MultPattern, PliesPattern } from "../patterns/types";
import { convertRange } from "../util";

enum IterType {
  Iter4 = 0,
  Iter8 = 1,
  Iter16 = 2,
  Iter48 = 3,
  Iter816 = 4,
}

export type Composition = {
  pattern: Pattern;
  cpsMultPattern: MultPattern;
  pliesPattern: PliesPattern;
  synthChan: number;
  periodSynthChan: number;
  playing: boolean;
  tidal: string;
  iterProb: number;
  revProb: number;
  iterType: IterType;
  cpsMultMin: number;
  cpsMultMax: number;
  cps: number;
};

let composition: Composition;

export const getComposition = () => composition;

export const createInitialComposition = () => {
  const pattern = generatePattern({});
  const cpsMultPattern = generateMultPattern({});
  const pliesPattern = generatePliesPattern();
  composition = {
    playing: false,
    iterProb: 0,
    revProb: 0,
    pattern,
    cpsMultPattern,
    pliesPattern,
    synthChan: 0, // randInt(0, 15),
    periodSynthChan: 0, // randInt(0, 15),
    tidal: "hush",
    iterType: IterType.Iter8,
    cpsMultMin: 0,
    cpsMultMax: 0,
    cps: 0.5,
  };
  evaluate(composition.tidal);
};

export const updateComposition = (
  fieldsToUpdate: Partial<Composition>
): Composition => {
  const newComposition = { ...composition, ...fieldsToUpdate };
  const tidal = getTidal(newComposition);
  composition = { ...newComposition, tidal };

  console.log(composition.tidal);

  evaluate(composition.tidal);
  return composition;
};

export const getTidal = (comp: Composition) => {
  const {
    pattern,
    synthChan,
    periodSynthChan,
    playing,
    iterProb,
    revProb,
    iterType,
    cpsMultMax,
    cpsMultMin,
    cps,
    pliesPattern,
  } = comp;
  const patternString = patternToString(pattern);
  const cpsMultPatternString = cpsMultPatternToString(comp);
  const mute = playing ? "id" : '(const $ s "~")';
  const actualCps = convertRange(cps, [0, 1], [0.1, 1.4]).toFixed(2);
  const pliesPat = pliesPatternToString(pliesPattern);
  const iter =
    iterType === IterType.Iter8
      ? "iter 8"
      : iterType === IterType.Iter4
      ? "iter 4"
      : iterType === IterType.Iter16
      ? "iter 16"
      : iterType === IterType.Iter48
      ? 'iter "<4 8>"'
      : 'iter "<8 16>"';
  return `do
  let pat = "${patternString}"
  d1 
    $ ${mute}
    $ (|* cps (range ${1 - cpsMultMin * 0.97} ${
    1 + cpsMultMax * 3
  } $ (666 ~>) $ rand))
    $ someCyclesBy ${revProb} rev $ (1 ~>)
    $ someCyclesBy ${iterProb} (${iter}) $ (1 ~>)
    $ (|* cps "${cpsMultPatternString}")
    $ stack [
      -- main synth
      ${pliesPat} $ struct pat $ s "synth1" # midichan ${synthChan} # amp 1 # note "c5"
      , struct (inv pat) $ s "synth1" # midichan ${synthChan} # amp 0.1 # note "c5"
      -- period synth
      , ${pliesPat} $ struct (inv pat) $ s "synth2" # midichan ${periodSynthChan} # amp 1 # note "c5"
      , struct pat $ s "synth2" # midichan ${periodSynthChan} # amp 0.1 # note "c5"
      -- kick
      , ${pliesPat} $ struct pat $ s "drums" # midichan 0 # amp 1 # note "c5"
      -- clap
      , ${pliesPat} $ struct (inv pat) $ s "drums" # midichan 3 # amp 1 # note "c5"
    ] # cps ${actualCps}`;
};
