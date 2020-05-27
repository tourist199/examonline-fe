import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { insertExam, updateExam, deleteExam, studentSubmitExam, getExamsByTeacher, getExamsByStudent, getExamById, getRoomsExam, getStudentsInExam, getInfoExamByStudent } from '@/api/exam'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.INSERT_EXAM, sagaHelper({
      api: insertExam
    })),
    takeLatest(TYPES.UPDATE_EXAM, sagaHelper({
      api: updateExam
    })),
    takeLatest(TYPES.DELETE_EXAM, sagaHelper({
      api: deleteExam
    })),
    takeLatest(TYPES.GET_EXAMS_BY_TEACHER, sagaHelper({
      api: getExamsByTeacher
    })),
    takeLatest(TYPES.GET_EXAMS_BY_STUDENT, sagaHelper({
      api: getExamsByStudent
    })),
    takeLatest(TYPES.GET_EXAM_BY_ID, sagaHelper({
      api: getExamById
    })),
    takeLatest(TYPES.GET_ROOMS_EXAM, sagaHelper({
      api: getRoomsExam
    })),
    takeLatest(TYPES.GET_STUDENTS_IN_EXAM, sagaHelper({
      api: getStudentsInExam
    })),
    takeLatest(TYPES.GET_INFO_EXAM_BY_STUDENT, sagaHelper({
      api: getInfoExamByStudent
    })),
    takeLatest(TYPES.STUDENT_SUBMIT_EXAM, sagaHelper({
      api: studentSubmitExam
    }))
  ])
}
