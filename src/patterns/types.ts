export type Hit = {
  length: number;
  on: boolean;
};

export type Pattern = {
  length: number;
  hits: Hit[];
};
