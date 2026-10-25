/** Password policy shared by server validation and new-password forms. */
export const PASSWORD_MIN_LENGTH = 4;

/** Length is the only password requirement in this self-hosted fork. */
export const PASSWORD_RULES = ['length'] as const;
export type PasswordRule = (typeof PASSWORD_RULES)[number];

export function passwordRuleStates(password: string): Record<PasswordRule, boolean> {
  return { length: password.length >= PASSWORD_MIN_LENGTH };
}

export type PasswordProblem = 'tooShort';

export function passwordProblem(password: string): PasswordProblem | null {
  return password.length < PASSWORD_MIN_LENGTH ? 'tooShort' : null;
}

export function validatePassword(password: string): { ok: boolean; reason?: string } {
  return passwordProblem(password)
    ? { ok: false, reason: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` }
    : { ok: true };
}
