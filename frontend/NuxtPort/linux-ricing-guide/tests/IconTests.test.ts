import { expect, test } from 'vitest'
import { iconToLink } from '../assets/utils/iconUtils'

test('Some name and a provider makes a link with name and that provider', () => {
    expect(iconToLink('link', 'fa6-solid')).toBe('fa6-solid:link')
})

test('Some name and no provider makes a link with name and the default provider', () => {
    expect(iconToLink('link')).toBe('fa6-solid:link')
})
test('Empty name and no provider defaults to "error" with the default provider', () => {
    expect(iconToLink('')).toBe('fa6-solid:error')
})

test('Empty name and invalid provider defaults to "error" with the default provider', () => {
    expect(iconToLink('', 'invalid-provider')).toBe('fa6-solid:error')
})

test('Valid name and invalid provider defaults to the name with the default provider', () => {
    expect(iconToLink('link', 'invalid-provider')).toBe('fa6-solid:link')
})

test('Empty name and empty provider defaults to "error" with the default provider', () => {
    expect(iconToLink('', '')).toBe('fa6-solid:error')
})

test('Whitespace name and no provider defaults to "error" with the default provider', () => {
    expect(iconToLink('   ')).toBe('fa6-solid:error')
})

test('Whitespace name and invalid provider defaults to "error" with the default provider', () => {
    expect(iconToLink('   ', 'invalid-provider')).toBe('fa6-solid:error')
})
