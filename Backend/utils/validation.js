export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
    return typeof email === 'string' ? email.trim().toLowerCase() : '';
}

export function isStrongPassword(password) {
    return typeof password === 'string'
        && password.length >= 8
        && /[a-z]/.test(password)
        && /[A-Z]/.test(password)
        && /\d/.test(password)
        && /[!@#$%^&*()?_<>-]/.test(password);
}

export function validName(name) {
    return typeof name === 'string' && /^[a-zA-Z][a-zA-Z0-9 ]{0,49}$/.test(name.trim());
}

export function validNoteValue(value, maxLength) {
    return typeof value === 'string' && value.trim().length <= maxLength;
}
