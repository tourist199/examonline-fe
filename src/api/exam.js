import { MainApi } from './endpoint'

export function insertExam(payload) {
    return MainApi.post('/exams/insertExam', payload)
}

export function getExamsByTeacher(payload) {
    const { page } = payload
    return MainApi.get(`/exams/get-exams-teacher?page=${page}`)
}

export function getExamById(id) {
    return MainApi.get('/exams/get-exam/' + id)
}

export function getExamsByStudent() {
    return MainApi.get('/exams/get-exams-student')
}

export function getRoomsExam() {
    return MainApi.get('/exams/get-rooms-exam')
}

export function getStudentsInExam(idExam) {
    return MainApi.get('/exam-student/get-students-in-exam/' + idExam)
}