import { describe, it, expect } from 'vitest';

import { range, shuffle } from '@/utils/iteration';

describe('`range` util function', () => {
  it('works for increment', () => {
    expect([...range(3)]).toEqual([0, 1, 2]);
    expect([...range(3, 6)]).toEqual([3, 4, 5]);
    expect([...range(6, 11, 2)]).toEqual([6, 8, 10]);
  });

  it('works for decrement', () => {
    expect([...range(3, 0, -1)]).toEqual([3, 2, 1]);
  });
});

describe('`shuffle` util function', () => {
  it('shuffles correctly without creating duplicates or missing values', () => {
    const original = [...range(256)];
    const shuffled = [...shuffle(original)];
    expect(shuffled.sort((a, b) => a - b)).toEqual(original);
  });
});
