import { passwordProblem, passwordRuleStates, validatePassword, PASSWORD_RULES } from './password-policy';
import { describe, expect, it } from 'vitest';

describe('self-hosted password policy', () => {
  it.each(['', 'a', '123'])('rejects passwords shorter than four characters: %j', (password) => {
    expect(passwordProblem(password)).toBe('tooShort');
    expect(validatePassword(password)).toEqual({ ok: false, reason: 'Password must be at least 4 characters' });
    expect(passwordRuleStates(password)).toEqual({ length: false });
  });
  it.each(['abcd', '1234', 'aaaa', 'ABCD', '!!!!', 'password', 'changeme', 'Abcdefg1!'])('accepts length four or greater without complexity restrictions: %j', (password) => {
    expect(passwordProblem(password)).toBeNull();
    expect(validatePassword(password)).toEqual({ ok: true });
    expect(passwordRuleStates(password)).toEqual({ length: true });
  });
  it('shows only the minimum-length requirement', () => {
    expect(PASSWORD_RULES).toEqual(['length']);
  });
});
