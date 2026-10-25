// FE-SHARED-PWCHECK-001 to FE-SHARED-PWCHECK-004
import { describe, expect, it } from 'vitest'
import { render, screen } from '../../../tests/helpers/render'
import PasswordChecklist from './PasswordChecklist'
import { passwordErrorKey } from '../../utils/passwordError'

describe('PasswordChecklist (#1200)', () => {
  it('FE-SHARED-PWCHECK-001: stays out of the way until something is typed', () => {
    const { container } = render(<PasswordChecklist password="" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('FE-SHARED-PWCHECK-002: ticks off each rule the password meets', () => {
    render(<PasswordChecklist password="abcdefg1" />)
    const list = screen.getByRole('list', { name: 'Password requirements' })
    const met = Array.from(list.querySelectorAll('li[data-met]')).map(li => li.textContent)
    expect(met).toEqual(['At least 4 characters'])
    expect(list.querySelectorAll('li')).toHaveLength(1)
  })

  it('FE-SHARED-PWCHECK-003: the always-light sign-in card keeps fixed colours', () => {
    render(<PasswordChecklist password="abcd" tone="light" />)
    const upper = screen.getByText('At least 4 characters').closest('li') as HTMLElement
    expect(upper.getAttribute('data-met')).toBe('true')
    expect(upper.style.background).not.toBe('')
  })
})

describe('passwordErrorKey (#1200)', () => {
  it('FE-SHARED-PWCHECK-004: names the problem the server would answer with, or nothing', () => {
    expect(passwordErrorKey('Ab1')).toBe('settings.passwordTooShort')
    expect(passwordErrorKey('zzzzzzzzzz')).toBeNull()
    expect(passwordErrorKey('Password')).toBeNull()
    expect(passwordErrorKey('longenough1')).toBeNull()
    expect(passwordErrorKey('Longenough1!')).toBeNull()
  })
})
