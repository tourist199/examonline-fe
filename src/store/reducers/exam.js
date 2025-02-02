import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,
  total: 0,
  listExam: [],
  examIndex: {},
  editExam: {},
  examSchedule: [],
  roomsExam: [],
  studentsInExam: [],
  listAnswerOfStudent: [],
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.INSERT_EXAM_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.INSERT_EXAM_SUCCESS:
      return {
        ...state,
        submitting: null
      }
    case TYPES.INSERT_EXAM_FAILURE:
      return {
        ...state,
        submitting: null,
        // error: action.error
      }

    case TYPES.DELETE_EXAM_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.DELETE_EXAM_SUCCESS:
      console.log('delete '+ action.data.idExamDeleted);
      
      return {
        ...state,
        submitting: null,
        listExam: state.listExam.filter(item => item._id !== action.data.idExamDeleted)
      }
    case TYPES.DELETE_EXAM_FAILURE:
      return {
        ...state,
        submitting: null,
        // error: action.error
      }

    case TYPES.GET_EXAMS_BY_TEACHER_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_EXAMS_BY_TEACHER_SUCCESS:

      return {
        ...state,
        submitting: null,
        listExam: action.data.listExam,
        total: action.data.total
      }
    case TYPES.GET_EXAMS_BY_TEACHER_FAILURE:
      return {
        ...state,
        submitting: null,
        // error: action.error
      }

    case TYPES.GET_INFO_EXAM_BY_STUDENT_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_INFO_EXAM_BY_STUDENT_SUCCESS:
      console.log(action);
      
      return {
        ...state,
        submitting: null,
        listAnswerOfStudent: action.data.listAnswer ? action.data.listAnswer : [],
        examIndex: action.data.examId
      }
    case TYPES.GET_INFO_EXAM_BY_STUDENT_FAILURE:
      return {
        ...state,
        submitting: null,
        // error: action.error
      }

    case TYPES.GET_STUDENTS_IN_EXAM_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_STUDENTS_IN_EXAM_SUCCESS:

      return {
        ...state,
        submitting: null,
        studentsInExam: action.data.lsStudent,
      }
    case TYPES.GET_STUDENTS_IN_EXAM_FAILURE:
      return {
        ...state,
        submitting: null,
        // error: action.error
      }

    case TYPES.GET_EXAMS_BY_STUDENT_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_EXAMS_BY_STUDENT_SUCCESS:
      return {
        ...state,
        submitting: null,
        examSchedule: action.data.listExam
      }
    case TYPES.GET_EXAMS_BY_STUDENT_FAILURE:
      return {
        ...state,
        submitting: null,
      }

    case TYPES.GET_ROOMS_EXAM_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_ROOMS_EXAM_SUCCESS:
      return {
        ...state,
        submitting: null,
        roomsExam: action.data.listExam
      }
    case TYPES.GET_ROOMS_EXAM_FAILURE:
      return {
        ...state,
        submitting: null,
      }

    case TYPES.GET_EXAM_BY_ID_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_EXAM_BY_ID_SUCCESS:
      return {
        ...state,
        submitting: null,
        editExam: action.data
      }
    case TYPES.GET_EXAM_BY_ID_FAILURE:
      return {
        ...state,
        submitting: null
      }

    default:
      return state
  }
}
