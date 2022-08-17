import { request } from "./AuthServices";

const baseUrl = 'http://localhost:3030/data/goals'


export async function getAllGoals() {
    return request('get', baseUrl)
}

export async function createGoal(data) {
    return request('post', baseUrl, data)
}

export async function updateGoal(id, data) {
    return request('put', `${baseUrl}/${id}`, data)
}

export async function deleteGoal(id) {
    return request('delete', `${baseUrl}/${id}`)
}