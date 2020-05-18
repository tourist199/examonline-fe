import { MainApi } from './endpoint'

export function insertTest(payload) {
    return MainApi.post('/tests/insert', payload)
}

export function updateTest(payload) {
    console.log(payload);
    
    return MainApi.put('/tests/'+payload.idTest, payload.data)
}

export function deleteTest(payload) {
    return MainApi.delete('/tests/'+payload)
}

export function getTestsByTeacher(page) {
    return MainApi.get('/tests/getTestsByTeacher?page='+ page)
}

export function getTestById(id) {
    return MainApi.get('/tests/'+ id)
}
