import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { insertTest, getTestsByTeacher, getTestById, updateTest, deleteTest } from '@/api/test'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.INSERT_TEST, sagaHelper({
      api: insertTest
    })),
    takeLatest(TYPES.GET_TESTS_BY_TEACHER, sagaHelper({
      api: getTestsByTeacher
    })),
    takeLatest(TYPES.GET_TEST_BY_ID, sagaHelper({
      api: getTestById
    })),
    takeLatest(TYPES.UPDATE_TEST, sagaHelper({
      api: updateTest
    })),
    takeLatest(TYPES.DELETE_TEST, sagaHelper({
      api: deleteTest
    }))
  ])
}
