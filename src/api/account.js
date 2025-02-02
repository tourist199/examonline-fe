import { MainApi } from './endpoint'

export function login(payload) {
  return MainApi.post('/users/login', payload)
}

export function register(payload) {
  return MainApi.post('/users/register', payload)
}

export function changeInfoUser(payload) {
  return MainApi.post('/users/change-user-info', payload)
}

export function getUsers(payload) {
  const { page } = payload
  return MainApi.get(`/users/get-users?page=${page}`)
}

export function getStudents() {
  return MainApi.get('/users/get-student')
}

export function getInfo() {
  return MainApi.get('/users/get-info')
}

export function deleteUser(payload) {
  return MainApi.delete(`/users/${payload}`)
}