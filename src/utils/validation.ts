export function isValidPhone(phone: string): boolean {
    return /^[\d\s()+-]+$/.test(phone)
}