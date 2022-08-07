import { clearAuthData, getAuthData, setAuthData } from "./AuthUtils"

const baseUrl = 'http://localhost:3030/users'

export async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    const authUser = getAuthData();

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    if (authUser) {
        options.headers['X-Authorization'] = authUser.accessToken
    }
    try {
        const response = await fetch(`${baseUrl}${url}`, options)

        if (response.ok === false) {
            if (response.status === 403) {
                clearAuthData()
            }
            const error = await response.json()
            throw error
        }

        if (response.status === 204) {
            return response;
        } else {
            return response.json()
        }

    } catch (err) {
        throw err
    }

}

export async function get(url) {
    return request('get', url)
}

export async function post(url, data) {
    return request('post', url, data)
}

export async function login(email, password) {
    const response = await post('/login', { email, password })

    const authData = {
        id: response._id,
        email: response.email,
        accessToken: response.accessToken
    }

    setAuthData(authData)

    return response
}

export async function register(email, password, rePass) {
    if (password !== rePass) {
        throw new Error('Passwords must match')
    }
    const response = await post('/register', { email, password, rePass })

    const authData = {
        id: response._id,
        email: response.email,
        accessToken: response.accessToken
    }

    setAuthData(authData)

    return response
}