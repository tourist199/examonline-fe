import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { getHistoryStudent, getHistoryDetail } from '@/api/history'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.GET_HISTORY_STUDENT, sagaHelper({
      api: getHistoryStudent
    })),
    takeLatest(TYPES.GET_EXAM_STUDENT_BY_ID, sagaHelper({
      api: getHistoryDetail
    }))
  ])
}
