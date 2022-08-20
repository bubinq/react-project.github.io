import { db } from "../firebase-config"
import { goalsCollectionRef } from "../firebase-constants/goalsCollection"
import { setDoc, doc, getDocs, deleteDoc } from "firebase/firestore"


export const getGoals = async () => {
    const data = await getDocs(goalsCollectionRef)
    return data
}

export const updateGoalStatus = async (goalId) => {
    const currentGoal = doc(db, 'goals', goalId)
    const data = await setDoc(currentGoal, { isExpired: true }, { merge: true })
    return data
}

export const removeGoal = async (goalId) => {
    const goalDoc = doc(db, "goals", goalId)
    const data = await deleteDoc(goalDoc)
    return data
}

export const saveGoal = async (goalId) => {
    const currentGoal = doc(db, 'goals', goalId)
    const data = await setDoc(currentGoal, { isSaved: true }, { merge: true })
    return data
}