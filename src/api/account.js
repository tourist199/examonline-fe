import { MainApi } from './endpoint'

export function login(payload) {
  return MainApi.post('/users/login', payload)
}

export function register(payload) {
  return MainApi.post('/users/register', payload)
}