import { MainApi } from './endpoint'

export function insertTest(payload) {
    return MainApi.post('/tests/insert', payload)
}

export function updateTest(payload) {
    console.log(payload);
    
    return MainApi.put('/tests/'+payload.idTest, payload.data)
}

export function changeStatusTestDraft(id) {
    return MainApi.put('/tests/change-status-test-draft/'+id)
}

export function changeStatusTestDone(id) {
    return MainApi.put('/tests/change-status-test-done/'+id)
}

export function deleteTest(payload) {
    return MainApi.delete('/tests/'+payload)
}

export function getTestsByTeacher(payload) {
    const { page } = payload
    return MainApi.get(`/tests/getTestsByTeacher?page=${page}`)
}

export function getTestById(id) {
    return MainApi.get('/tests/'+ id)
}

export function getTestsWaitingAdmin() {
    return MainApi.get('/tests/getTestsWatting')
}