export const randInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

export const randItem = <T>(items: Array<T>): T => {
  return items[randInt(0, items.length - 1)];
};

export const convertRange = (
  value: number,
  r1: Array<number>,
  r2: Array<number>
) => {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
};
