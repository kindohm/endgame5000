export const randInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

export const randItem = <T>(items: Array<T>): T => {
  return items[randInt(0, items.length - 1)];
};
