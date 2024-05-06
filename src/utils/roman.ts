const ROMAN_SYMBOLS = 'IVXLCDM';

export function decimal2roman(n: number) {
  n = Math.trunc(n);
  if (n <= 0 || n > 3999) {
    throw new Error('Invalid input');
  }
  let s = '';
  let i = 0;
  while (n > 0) {
    const d = n % 10;
    n = Math.trunc(n / 10);
    if (d === 9) {
      s = ROMAN_SYMBOLS[i] + ROMAN_SYMBOLS[i + 2] + s;
    } else if (d === 4) {
      s = ROMAN_SYMBOLS[i] + ROMAN_SYMBOLS[i + 1] + s;
    } else if (d >= 5) {
      s = ROMAN_SYMBOLS[i + 1] + ROMAN_SYMBOLS[i].repeat(d - 5) + s;
    } else if (d > 0) {
      s = ROMAN_SYMBOLS[i].repeat(d) + s;
    }
    i += 2;
  }
  return s;
}

export function roman2decimal(s: string) {
  let n = 0;
  let d = 0;
  let i = 0;
  let j = 6;
  let allowed = ROMAN_SYMBOLS.slice(j, j + 2);

  function flush(k: number) {
    n += k * Math.pow(10, j / 2);
    d = 0;
    j -= 2;
    allowed = ROMAN_SYMBOLS.slice(j, j + 2);
  }

  while (i < s.length && j >= 0) {
    if (!allowed.includes(s[i])) {
      flush(d);
      continue;
    }
    if (d === 0) {
      if (s[i] === ROMAN_SYMBOLS[j + 1]) {
        d = 5;
        allowed = ROMAN_SYMBOLS[j];
      } else {
        d = 1;
        allowed = ROMAN_SYMBOLS.slice(j, j + 3);
      }
    } else if (d === 1) {
      if (s[i] === ROMAN_SYMBOLS[j + 2]) flush(9);
      else if (s[i] === ROMAN_SYMBOLS[j + 1]) flush(4);
      else {
        d = 2;
        allowed = ROMAN_SYMBOLS[j];
      }
    } else if (d === 2 || d === 7) {
      d += 1;
      allowed = '';
    } else {
      d += 1;
    }
    i++;
  }
  flush(d);

  if (i < s.length) throw new Error('Invalid input');
  return n;
}
