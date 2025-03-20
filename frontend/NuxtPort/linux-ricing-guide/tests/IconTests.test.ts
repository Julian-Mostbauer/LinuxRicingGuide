import { describe, it, expect, beforeEach } from 'vitest'
import { iconToLink, setActiveProvider, activeProvider } from '../assets/utils/iconUtils'

describe('setActiveProvider', () => {
    beforeEach(() => {
        // Reset the activeProvider before each test
        setActiveProvider('mdi')
    })

    it('should update activeProvider if the input is valid', () => {
        setActiveProvider('fa6-solid')
        expect(activeProvider).toBe('fa6-solid')
    })

    it('should not update activeProvider if the input is empty or whitespace', () => {
        setActiveProvider(' ')
        expect(activeProvider).toBe('mdi') // Default activeProvider
    })

    it('should not update activeProvider if the input is not in availableProviders', () => {
        setActiveProvider('invalid-provider')
        expect(activeProvider).toBe('mdi') // Default activeProvider
    })
})

describe('iconToLink', () => {
    beforeEach(() => {
        // Reset the activeProvider before each test
        setActiveProvider("mdi")
    })

    it('should throw an error if the default option is missing in providerSpecificNames', () => {
        const providerSpecificNames = new Map([['fa6-solid', 'house']])
        expect(() => iconToLink(providerSpecificNames)).toThrowError(
            'You have to provide a default option'
        )
    })

    it('should use the alwaysUseProvider if it is valid', () => {
        const providerSpecificNames = new Map([
            ['default', 'home'],
            ['fa6-solid', 'house'],
        ])
        const result = iconToLink(providerSpecificNames, 'fa6-solid')
        expect(result).toBe('fa6-solid:house')
    })

    it('should fall back to activeProvider if alwaysUseProvider is invalid', () => {
        const providerSpecificNames = new Map([
            ['default', 'home'],
            ['fa6-solid', 'house'],
        ])
        const result = iconToLink(providerSpecificNames, 'invalid-provider')
        expect(result).toBe('mdi:home')
    })

    it('should fall back to activeProvider if alwaysUseProvider is not provided', () => {
        const providerSpecificNames = new Map([
            ['default', 'home'],
            ['fa6-solid', 'house'],
        ])
        const result = iconToLink(providerSpecificNames)
        expect(result).toBe('mdi:home')
    })

    it('should use the name from the default entry if the provider-specific name is missing', () => {
        const providerSpecificNames = new Map([['default', 'home']])
        const result = iconToLink(providerSpecificNames, 'fa6-solid')
        expect(result).toBe('fa6-solid:home')
    })

    it('should default to "error" if no valid name is found', () => {
        const providerSpecificNames = new Map([
            ['default', ''], // Empty name
        ])
        const result = iconToLink(providerSpecificNames)
        expect(result).toBe('mdi:error')
    })

    it('should use the provider-specific name if available', () => {
        const providerSpecificNames = new Map([
            ['default', 'home'],
            ['fa6-solid', 'house'],
        ])
        const result = iconToLink(providerSpecificNames, 'fa6-solid')
        expect(result).toBe('fa6-solid:house')
    })
})
