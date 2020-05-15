import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { insertTest, getTestsByTeacher } from '@/api/test'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.INSERT_TEST, sagaHelper({
      api: insertTest
    })),
    takeLatest(TYPES.GET_TESTS_BY_TEACHER, sagaHelper({
      api: getTestsByTeacher
    }))
  ])
}
