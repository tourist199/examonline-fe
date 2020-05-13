import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { insertTest } from '@/api/test'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.INSERT_TEST, sagaHelper({
      api: insertTest
    }))
  ])
}
