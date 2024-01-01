import {
  createInitialComposition,
  getTidal,
  updateComposition,
} from "./composition/composition";
import { copyHit } from "./patterns/copyHit";
import { generatePattern } from "./patterns/generatePattern";
import { nudgePattern } from "./patterns/nudgePattern";
import { patternToString } from "./patterns/patternToString";
import { removeHit } from "./patterns/removeHit";
import { randInt } from "./util";

console.log("hi");

let pat = generatePattern({});

console.log(patternToString(pat));

createInitialComposition();

for (let i = 0; i < 15; i++) {
  pat =
    Math.random() > 0.8
      ? copyHit(pat, randInt(1, 2))
      : Math.random() > 0.8
      ? removeHit(pat)
      : nudgePattern(pat);
  // console.log(patternToString(pat));
  updateComposition({ pattern: pat });
  console.log(getTidal());
}
