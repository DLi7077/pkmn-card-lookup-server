export function listFormat<T>(list: T[]) {
  return {
    count: list.length,
    data: list,
  };
}

export function randomNumberBetween(min: number, max: number) {
  const range = max - min;
  return Math.random() * range + min;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
