import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,
  listUser: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.INSERT_TEST_REQUEST:
      console.log(action);
      
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.INSERT_TEST_SUCCESS:
      console.log(action);
      return {
        ...state,
        submitting: null
      }
    case TYPES.INSERT_TEST_FAILURE:
      console.log(action);
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    
    default:
      return state
  }
}
