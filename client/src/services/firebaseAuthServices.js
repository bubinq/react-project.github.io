import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { authUser } from '../firebase-config'

export const signUp = async (email, password) => {
    const result = await createUserWithEmailAndPassword(authUser, email, password)
    return result
}

export const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(authUser, email, password)
    return result
}

export const logout = async () => {
    const result = await signOut(authUser)
    return result
}