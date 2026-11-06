function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
export function cusipCheckDigit(body: string): string {
  strictText(body, 8);
  if (body.length !== 8 || /[^A-Z0-9*@#]/.test(body)) throw new RangeError('CUSIP8 syntax');
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    const c = body[i]!,
      code = c.charCodeAt(0),
      value = c === '*' ? 36 : c === '@' ? 37 : c === '#' ? 38 : code >= 65 ? code - 55 : code - 48,
      n = value * (i % 2 ? 2 : 1);
    sum += Math.floor(n / 10) + (n % 10);
  }
  return String((10 - (sum % 10)) % 10);
}
export function validateCusip(code: string): boolean {
  strictText(code, 9);
  if (code.length !== 9 || /[^0-9]/.test(code[8]!)) throw new RangeError('CUSIP9 syntax');
  return cusipCheckDigit(code.slice(0, 8)) === code[8];
}
