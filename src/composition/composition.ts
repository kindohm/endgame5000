import { evaluate } from "../ghci/evaluate";
import { generatePattern } from "../patterns/generatePattern";
import { patternToString } from "../patterns/patternToString";
import { Pattern } from "../patterns/types";

export type Composition = {
  pattern: Pattern;
  synthChan: number;
  periodSynthChan: number;
  playing: boolean;
  tidal: string;
};

let composition: Composition;

export const getComposition = () => composition;

export const createInitialComposition = () => {
  const pattern = generatePattern({});
  composition = {
    playing: false,
    pattern,
    synthChan: 0, // randInt(0, 15),
    periodSynthChan: 0, // randInt(0, 15),
    tidal: "hush",
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
  const { pattern, synthChan, periodSynthChan, playing } = comp;
  const patternString = patternToString(pattern);
  const mute = playing ? "id" : '(const $ s "~")';
  return `do
  let pat = "${patternString}"
  d1 
    $ ${mute}
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
