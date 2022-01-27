export type Simplify<T> = {
  [key in keyof T]: T[key];
};
