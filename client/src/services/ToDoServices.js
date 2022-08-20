import { db } from "../firebase-config"
import { arrayUnion, arrayRemove, updateDoc, doc } from "firebase/firestore"

export const CreateTodo = async (goalId, note, id) => {
    const currentGoal = doc(db, 'goals', goalId)
    const result = await updateDoc(currentGoal,
        { toDos: arrayUnion({ id: id, todo: note, isCompleted: false }) })
    return result
}

export const CompleteToDo = async (currentGoal, todo) => {
    const result = await updateDoc(currentGoal, { toDos: arrayRemove(todo) })
    return result
}

export const finishCompleted = async (currentGoal, todo) => {
    const result = await updateDoc(currentGoal, { toDos: arrayUnion({ id: todo.id, todo: todo.todo, isCompleted: !todo.isCompleted }) })
    return result
}

export const deleteToDo = async (goalId, todo) => {
    const currentGoal = doc(db, 'goals', goalId)
    const result = await updateDoc(currentGoal, { toDos: arrayRemove(todo) })
    return result
}

export const editToDo = async (todo, currentGoal) => {
    const result = await updateDoc(currentGoal, { toDos: arrayRemove(todo) })
    return result
}

export const finishEdited = async (currentGoal, todo, newText) => {
    const result = updateDoc(currentGoal, { toDos: arrayUnion({ id: todo.id, todo: newText, isCompleted: false }) })
    return result
}

export const resetToDo = async (currentGoal, todo) => {
    await updateDoc(currentGoal, { toDos: arrayRemove(todo) })
}

export const reset = async (currentGoal, todo) => {
    await updateDoc(currentGoal, { toDos: arrayUnion({ id: todo.id, todo: todo.todo, isCompleted: false }) })
}