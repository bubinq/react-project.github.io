export function getAuthData() {
    return JSON.parse(localStorage.getItem('authData'));
}

export function setAuthData(data) {
    localStorage.setItem('authData', JSON.stringify(data))
}

export function clearAuthData() {
    localStorage.removeItem('authData')
}