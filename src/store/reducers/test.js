import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,
  listTest: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.INSERT_TEST_REQUEST:

      return {
        ...state,
        submitting: action.type
      }
    case TYPES.INSERT_TEST_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.INSERT_TEST_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }

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

    default:
      return state
  }
}
