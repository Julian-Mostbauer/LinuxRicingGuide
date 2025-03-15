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

test('Specific provider name overrides the default name', () => {
    const providerSpecificNames = [
        { provider: 'mdi', name: 'mdi-icon' },
        { provider: 'fa6-solid', name: 'fa-icon' },
    ]
    expect(iconToLink('link', 'mdi', providerSpecificNames)).toBe(
        'mdi:mdi-icon'
    )
    expect(iconToLink('link', 'fa6-solid', providerSpecificNames)).toBe(
        'fa6-solid:fa-icon'
    )
})

test('Specific provider name is ignored if provider does not match', () => {
    const providerSpecificNames = [{ provider: 'mdi', name: 'mdi-icon' }]
    expect(iconToLink('link', 'fa6-solid', providerSpecificNames)).toBe(
        'fa6-solid:link'
    )
})

test('Specific provider name is ignored if providerSpecificNames is empty', () => {
    expect(iconToLink('link', 'mdi', [])).toBe('mdi:link')
})

test('Specific provider name is ignored if providerSpecificNames is undefined', () => {
    expect(iconToLink('link', 'mdi')).toBe('mdi:link')
})

test('Specific provider name is ignored if provider is invalid', () => {
    const providerSpecificNames = [{ provider: 'mdi', name: 'mdi-icon' }]
    expect(iconToLink('link', 'invalid-provider', providerSpecificNames)).toBe(
        'fa6-solid:link'
    )
})

test('Specific provider name is ignored if name is empty', () => {
    const providerSpecificNames = [{ provider: 'mdi', name: 'mdi-icon' }]
    expect(iconToLink('', 'mdi', providerSpecificNames)).toBe('mdi:mdi-icon')
})

test('Specific provider name is ignored if name is whitespace', () => {
    const providerSpecificNames = [{ provider: 'mdi', name: 'mdi-icon' }]
    expect(iconToLink('   ', 'mdi', providerSpecificNames)).toBe('mdi:mdi-icon')
})
