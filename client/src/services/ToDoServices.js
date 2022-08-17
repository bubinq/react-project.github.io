import { request } from "./AuthServices";

const baseUrl = 'http://localhost:3030/data/todos'


export async function getAllToDos() {
    return request('get', baseUrl)
}

export async function getAllToDosByIdAndOwner(id) {
    const owner = encodeURIComponent(`user=_ownerId:users`)
    const match = encodeURIComponent(`goalId="${id}"`)
    return request('get', `${baseUrl}?where${match}&load${owner}`)
}

export async function getAllToDosById(id) {
    const match = encodeURIComponent(`goalId="${id}"`)
    return request('get', `${baseUrl}?where${match}`)
}


export async function createToDo(id, data) {
    return request('post', baseUrl, {goalId: id, ...data})
}

export async function updateToDos(id, data) {
    return request('put', `${baseUrl}/${id}`, data)
}

export async function deleteToDo(id) {
    return request('delete', `${baseUrl}/${id}`)
}