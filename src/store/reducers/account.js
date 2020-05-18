import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,
  listUser: [],
  total: 0,
  listStudent: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.LOGIN_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.LOGIN_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    case TYPES.GET_USERS_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_USERS_SUCCESS:
      console.log(action.data);

      return {
        ...state,
        submitting: null,
        listUser: action.data.listUser,
        total: action.data.total
      }
    case TYPES.GET_USERS_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    case TYPES.GET_STUDENTS_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        submitting: null,
        listStudent: action.data.listStudent
      }
    case TYPES.GET_STUDENTS_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    default:
      return state
  }
}
