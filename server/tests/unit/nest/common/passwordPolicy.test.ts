import { validatePassword } from '../../../../src/nest/common/passwordPolicy';
import { describe, it, expect } from 'vitest';

describe('server password policy', () => {
  it.each(['', 'a', 'abc'])('rejects fewer than four characters: %j', (password) => {
    expect(validatePassword(password)).toEqual({ ok: false, reason: 'Password must be at least 4 characters' });
  });
  it.each(['abcd', '1234', 'AAAA', '!!!!', 'password', 'Changeme'])('accepts four or more characters: %j', (password) => {
    expect(validatePassword(password)).toEqual({ ok: true });
  });
});
