import { MainApi } from './endpoint'

export function insertExam(payload) {
    return MainApi.post('/exams/insertExam', payload)
}

export function getExamsByTeacher(payload) {
    return MainApi.get('/exams/get-exams-teacher', payload)
}