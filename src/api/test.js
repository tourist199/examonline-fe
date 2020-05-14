import { MainApi } from './endpoint'

export function insertTest(payload) {
    console.log(payload);
    return MainApi.post('/tests/insert', payload)
}
