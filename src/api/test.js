import { MainApi } from './endpoint'

export function insertTest(payload) {
    return MainApi.post('/tests/insert', payload)
}

export function getTestsByTeacher(page) {
    return MainApi.get('/getTestsByTeacher/'+ page)
}