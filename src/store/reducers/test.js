import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,
  listTest: [],
  editTest: {},
  listTestWaiting: [],
  listTestDone: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_TESTS_BY_TEACHER_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_TESTS_BY_TEACHER_SUCCESS:
      return {
        ...state,
        submitting: null,
        listTest: action.data.result
      }
    case TYPES.GET_TESTS_BY_TEACHER_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    case TYPES.GET_TESTS_DONE_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_TESTS_DONE_SUCCESS:
      console.log(action);
      
      return {
        ...state,
        submitting: null,
        listTestDone: action.data.result
      }
    case TYPES.GET_TESTS_DONE_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    case TYPES.GET_TESTS_WAITING_ADMIN_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_TESTS_WAITING_ADMIN_SUCCESS:
      return {
        ...state,
        submitting: null,
        listTestWaiting: action.data.result
      }
    case TYPES.GET_TESTS_WAITING_ADMIN_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    case TYPES.GET_TEST_BY_ID_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_TEST_BY_ID_SUCCESS:
      return {
        ...state,
        submitting: null,
        editTest: action.data
      }
    case TYPES.GET_TEST_BY_ID_FAILURE:
      return {
        ...state,
        submitting: null
      }

    default:
      return state
  }
}
