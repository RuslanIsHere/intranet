import { isValidPhone } from './validation'

describe('isValidPhone', () => {
    it('accepte un numéro classique', () => {
        expect(isValidPhone('+33 6 12 34 56 78')).toBe(true)
    })

    it('accepte un numéro avec des tirets', () => {
        expect(isValidPhone('01-23-45-67-89')).toBe(true)
    })

    it('rejette les lettres', () => {
        expect(isValidPhone('06AB2345CD')).toBe(false)
    })

    it('rejette les caractères spéciaux', () => {
        expect(isValidPhone('06@12#34!56')).toBe(false)
    })
})
