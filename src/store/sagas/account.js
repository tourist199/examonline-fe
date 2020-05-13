import { all, takeLatest } from 'redux-saga/effects'

import sagaHelper from '@/utils/saga-helper'
import { TYPES } from '@/store/actions'
import { login, register, getUsers, deleteUser } from '@/api/account'

export default function* watcher() {
  yield all([
    takeLatest(TYPES.LOGIN, sagaHelper({
      api: login
    })),
    takeLatest(TYPES.REGISTER, sagaHelper({
      api: register
    })),
    takeLatest(TYPES.GET_USERS, sagaHelper({
      api: getUsers
    })),
    takeLatest(TYPES.DELETE_USER, sagaHelper({
      api: deleteUser
    }))
  ])
}
