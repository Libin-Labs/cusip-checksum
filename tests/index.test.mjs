import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('Apple reference', () => {
  assert.ok(api.validateCusip('037833100'));
});
test('Microsoft reference', () => {
  assert.ok(api.validateCusip('594918104'));
});
test('alphabetic checksum reference', () => {
  assert.ok(api.validateCusip('G45948109'));
});
test('mismatch only false', () => {
  assert.equal(api.validateCusip('037833101'), false);
});
test('syntax and special support', () => {
  assert.throws(() => api.validateCusip('g45948106'));
  assert.throws(() => api.cusipCheckDigit('1234567!'));
  assert.ok(/^[0-9]$/.test(api.cusipCheckDigit('12*@#ABC')));
});
test('digit split oracle', () => {
  for (let i = 0; i < 100; i++) {
    const body = String(i * 137).padStart(8, '0'),
      sum = [...body].reduce(
        (s, d, j) =>
          s + [...String(Number(d) * (j % 2 ? 2 : 1))].reduce((n, c) => n + Number(c), 0),
        0,
      );
    assert.equal(api.cusipCheckDigit(body), String((10 - (sum % 10)) % 10));
  }
});
