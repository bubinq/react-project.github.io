import { db } from "../firebase-config"
import { collection } from 'firebase/firestore'

export const goalsCollectionRef = collection(db, 'goals')
export const dayProgressRef = collection(db, 'progress')