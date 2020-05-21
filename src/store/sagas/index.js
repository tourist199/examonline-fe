import { all } from 'redux-saga/effects'

import account from './account'
import test from './test'
import exam from './exam'

export default function* sagas() {
  yield all([
    account(),
    test(),
    exam()
  ])
}
