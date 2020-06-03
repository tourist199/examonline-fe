import { TYPES } from '@/store/actions'

const INIT_STATE = {
    loaded: [],
    submitting: null,
    error: null,
    historiesStudent: []
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case TYPES.GET_HISTORY_STUDENT_REQUEST:
            return {
                ...state,
                submitting: action.type
            }
        case TYPES.GET_HISTORY_STUDENT_SUCCESS:
            return {
                ...state,
                submitting: null,
                historiesStudent: action.data
            }
        case TYPES.GET_HISTORY_STUDENT_FAILURE:
            return {
                ...state,
                submitting: null,
                // error: action.error
            }

        default:
            return state
    }
}
