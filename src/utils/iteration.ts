export function* range(start: number, end?: number, step = 1) {
  if (end == null) {
    end = start;
    start = 0;
  }
  if (step > 0) {
    while (start < end) {
      yield start;
      start += step;
    }
  } else {
    while (start > end) {
      yield start;
      start += step;
    }
  }
}

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export function* shuffle<T>(iter: Iterable<T>) {
  const arr = [...iter];
  let i = arr.length - 1;
  while (i >= 0) {
    const j = Math.floor(Math.random() * (i + 1));
    const el = arr[j];
    yield el;
    arr[j] = arr[i];
    arr[i] = el;
    i--;
  }
}
