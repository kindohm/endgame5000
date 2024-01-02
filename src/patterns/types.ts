export type Hit = {
  length: number;
  on: boolean;
};

export type Pattern = {
  length: number;
  hits: Hit[];
};

export type CpsMult = {
  length: number;
  mult: number;
};

export type MultPattern = {
  length: number;
  mults: CpsMult[];
};
