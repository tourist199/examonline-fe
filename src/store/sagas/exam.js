import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { insertExam, getExamsByTeacher, getExamById } from '@/api/exam'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.INSERT_EXAM, sagaHelper({
      api: insertExam
    })), 
    takeLatest(TYPES.GET_EXAMS_BY_TEACHER, sagaHelper({
      api: getExamsByTeacher
    })),
    takeLatest(TYPES.GET_EXAM_BY_ID, sagaHelper({
      api: getExamById
    })) 
  ])
}
