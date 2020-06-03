import { MainApi } from './endpoint'

export function getHistoryStudent() {
    return MainApi.get('/histories/get-history-by-student')
}