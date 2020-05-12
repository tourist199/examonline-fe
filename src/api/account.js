import { MainApi } from './endpoint'

export function login(payload) {
  console.log(payload);
  
  
  return MainApi.post('/users/login', payload)
}