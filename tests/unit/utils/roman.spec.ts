import { describe, it, expect } from 'vitest';

import { decimal2roman, roman2decimal } from '@/utils/roman';
import { range } from '@/utils/iteration';

describe('Roman numeral to decimal conversion', () => {
  const ROMAN_DECIMAL_PAIRS: [number, string][] = [
    [39, 'XXXIX'],
    [246, 'CCXLVI'],
    [789, 'DCCLXXXIX'],
    [2421, 'MMCDXXI'],
    [160, 'CLX'],
    [207, 'CCVII'],
    [1009, 'MIX'],
    [1066, 'MLXVI'],
    [1776, 'MDCCLXXVI'],
    [1918, 'MCMXVIII'],
    [1944, 'MCMXLIV'],
    [2024, 'MMXXIV']
  ];

  for (const i of range(1, 16)) {
    for (const j of range(1, 16)) {
      const s = decimal2roman(i * j);
      if (s.length >= 8) console.log(s, i * j);
    }
  }

  it('converts decimals to Roman numerals correctly', () => {
    for (const [n, s] of ROMAN_DECIMAL_PAIRS) {
      expect(decimal2roman(n)).toBe(s);
      expect(roman2decimal(s)).toBe(n);
    }
  });

  it('rejects out of range decimal inputs', () => {
    expect(() => decimal2roman(0)).toThrow('Invalid input');
    expect(() => decimal2roman(4000)).toThrow('Invalid input');
    expect(() => decimal2roman(1)).not.toThrow('Invalid input');
    expect(() => decimal2roman(3999)).not.toThrow('Invalid input');
  });

  it('trucate non-integer input', () => {
    expect(decimal2roman(39.5)).toBe(decimal2roman(39));
  });

  it('rejects invalid Roman numerals', () => {
    expect(() => roman2decimal('IC')).toThrow('Invalid input');
  });
});
