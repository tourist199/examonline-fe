import { MainApi } from './endpoint'

export function insertExam(payload) {
    console.log(payload);

    return MainApi.post('/exams/insertExam', payload)
}

export function getExamsByTeacher(page) {
    return MainApi.get('/exams/get-exams-teacher?page=' + page)
}