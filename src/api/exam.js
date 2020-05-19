import { MainApi } from './endpoint'

export function insertExam(payload) {
    return MainApi.post('/exams/insertExam', payload)
}

export function getExamsByTeacher(payload) {
    const { page } = payload
    return MainApi.get(`/exams/get-exams-teacher?page=${page}`)
}

export function getExamById(id) {
    return MainApi.get('/get-exam/'+ id)
}
