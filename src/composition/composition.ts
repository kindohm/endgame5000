import { evaluate } from "../ghci/evaluate";
import {
  generateMultPattern,
  generatePattern,
} from "../patterns/generatePattern";
import {
  cpsMultPatternToString,
  patternToString,
} from "../patterns/patternToString";
import { Pattern, MultPattern } from "../patterns/types";

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
  synthChan: number;
  periodSynthChan: number;
  playing: boolean;
  tidal: string;
  iterProb: number;
  revProb: number;
  iterType: IterType;
  cpsMultMin: number;
  cpsMultMax: number;
};

let composition: Composition;

export const getComposition = () => composition;

export const createInitialComposition = () => {
  const pattern = generatePattern({});
  const cpsMultPattern = generateMultPattern({});
  composition = {
    playing: false,
    iterProb: 0,
    revProb: 0,
    pattern,
    cpsMultPattern,
    synthChan: 0, // randInt(0, 15),
    periodSynthChan: 0, // randInt(0, 15),
    tidal: "hush",
    iterType: IterType.Iter8,
    cpsMultMin: 0,
    cpsMultMax: 0,
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
  } = comp;
  const patternString = patternToString(pattern);
  const cpsMultPatternString = cpsMultPatternToString(comp);
  const mute = playing ? "id" : '(const $ s "~")';
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
    $ (|* cps "${cpsMultPatternString}")
    $ someCyclesBy ${revProb} rev $ (1 ~>)
    $ someCyclesBy ${iterProb} (${iter}) $ (1 ~>)
    $ stack [
      -- main synth
      struct pat $ s "synth1" # midichan ${synthChan} # amp 1 # note "c5"
      , struct (inv pat) $ s "synth1" # midichan ${synthChan} # amp 0.1 # note "c5"
      -- period synth
      , struct (inv pat) $ s "synth2" # midichan ${periodSynthChan} # amp 1 # note "c5"
      , struct pat $ s "synth2" # midichan ${periodSynthChan} # amp 0.1 # note "c5"
      -- kick
      , struct pat $ s "drums" # midichan 0 # amp 1 # note "c5"
      -- clap
      , struct (inv pat) $ s "drums" # midichan 3 # amp 1 # note "c5"
    ] # cps 0.666`;
};
