import { MainApi } from './endpoint'

export function insertExam(payload) {
    return MainApi.post('/exams/insertExam', payload)
}

export function updateExam(payload) {
    return MainApi.post('/exams/updateExam', payload)
}

export function deleteExam(idExam) {
    return MainApi.delete('/exams/' + idExam)
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

/**
 * Teacher get students to display in room exam
 */

export function getStudentsInExam(idExam) {
    return MainApi.get('/exam-student/get-students-in-exam/' + idExam)
}


/**
 * Student get answers which they have done
 */
export function getInfoExamByStudent(idExam) {
    return MainApi.get('/exam-student/get-info-by-student/' + idExam)
}

/**
 * submit exam 
 */

export function studentSubmitExam(payload) {
    return MainApi.post('/exam-student/submit-exam', payload)
}