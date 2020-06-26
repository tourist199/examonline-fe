import { MainApi } from './endpoint'

export function getHistoryStudent() {
    return MainApi.get('/histories/get-history-by-student')
}

export function getHistoryDetail(idExamStudent) {
    return MainApi.get('/exam-student/get-exam-student/'+idExamStudent)
}