const backendURL = "http://localhost:8080/api"

interface User {
    "username": string
    "password": string
}

export const registerUser = async ({ username, password }: User) => {
    const res = await fetch(`${backendURL}/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    })
    
    if(!res.ok) {
        throw new Error("Failed to REGISTER user")
    }

    const response = await res.json()
    return response
}

export const loginUser = async ({ username, password }: User) => {
    const res = await fetch(`${backendURL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    })
    
    if(!res.ok) {
        throw new Error("Failed to LOGIN user")
    }

    const response = await res.json()
    return response
}

export const logoutUser = async () => {
    const res = await fetch(`${backendURL}/logout`, {
        method: 'POST',
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error("Failed to LOGOUT user")
    }

    const response = await res.json()
    document.cookie = 'mysession=; Max-Age=-99999999;'
    return response
}

export const isUserLoggedIn = () => {
    if (typeof window !== 'undefined') {

        const cookies = document.cookie.split(';')

        for (let cookie of cookies) {
            cookie = cookie.trim()
            if (cookie.startsWith('mysession=')) {
                return true
            }
        }
    }
    return false
}