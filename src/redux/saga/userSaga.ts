// @ts-nocheck
import axios from 'axios'
import { cancel, takeLatest, put, select } from 'redux-saga/effects'

import {
  getUserSuccess,
  setToken,
  SIGNIN_USER,
  SIGNIN_GOOGLE,
  SIGNUP_USER,
  GET_USER,
  UPDATE_USER,
  CHANGE_PASSWORD,
  CLEAR_TOKEN,
} from '../action'
import { setMessage } from '../action'

export function* clearCredential() {
  yield takeLatest(CLEAR_TOKEN, function* ({ payload }) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    yield put(getUserSuccess('', {}))
  })
}

export function* signinUser() {
  yield takeLatest(SIGNIN_USER, function* ({ payload }) {
    if (!payload) {
      return
    }
    try {
      const response = yield axios.post('/users/signin', payload)
      const { user, token } = yield response.data.user

      yield put(getUserSuccess(token, user))
    } catch (error) {
      yield put(
        setMessage({ content: error.response.data.message, type: 'error' })
      )
    }
  })
}

export function* signinWithGoogle() {
  yield takeLatest(SIGNIN_GOOGLE, function* ({ payload }) {
    if (!payload) {
      return
    }
    try {
      const response = yield axios.post('/users/signin_with_google', payload)
      const { user, token } = yield response.data

      yield put(getUserSuccess(token, user))
    } catch (error) {
      yield cancel()
    }
  })
}

export function* signupUser() {
  yield takeLatest(SIGNUP_USER, function* ({ payload }) {
    if (!payload) {
      return
    }
    try {
      const response = yield axios.post('/users/signup', payload)
      const { user, token } = yield response.data.user

      yield put(getUserSuccess(token, user))
    } catch (error) {
      yield cancel()
    }
  })
}

export function* updateUser() {
  yield takeLatest(UPDATE_USER, function* ({ payload }) {
    if (!payload) {
      return
    }
    try {
      const response = yield axios.put('/users/', payload)
      const { user, token } = yield response.data.user

      yield put(getUserSuccess(token, user))
    } catch (error) {
      yield cancel()
    }
  })
}

export function* changePassword() {
  yield takeLatest(CHANGE_PASSWORD, function* ({ payload }) {
    if (!payload) {
      return
    }
    try {
      const response = yield axios.put('/users/password', payload)
      const { token } = yield response.data

      yield put(setToken(token))
    } catch (error) {
      yield cancel()
    }
  })
}

export function* getUser() {
  yield takeLatest(GET_USER, function* () {
    const { token } = yield select((state) => state.userReducer)
    if (token) {
      const response = yield axios.get('/users/')
      const { user } = yield response.data

      yield put(getUserSuccess(token, user))
    }
    yield cancel()
  })
}
