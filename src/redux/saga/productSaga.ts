// @ts-nocheck
import axios from 'axios'
import { takeLatest, put } from 'redux-saga/effects'

import {
  GET_ONE_PRODUCT,
  GET_PRODUCTS,
  GET_CATEGORIES,
  setMessage,
  getSingleProductSuccess,
  getProductsSuccess,
  getCategoriesSuccess,
} from '../action'

export function* getProduct() {
  yield takeLatest(GET_ONE_PRODUCT, function* ({ payload }) {
    if (!payload) {
      return
    }
    try {
      const response = yield axios.get(`/products/${payload}`)
      const product = yield response.data

      yield put(getSingleProductSuccess(product))
    } catch (error) {
      yield put(
        setMessage({ content: error.response.data.message, type: 'error' })
      )
    }
  })
}
export function* getProductList() {
  yield takeLatest(GET_PRODUCTS, function* ({ payload }) {
    try {
      const response = yield axios.get(`/products?${payload}`)
      const {products, total} = yield response.data 

      yield put(getProductsSuccess(products, total))
    } catch (error) {
      yield put(
        setMessage({ content: error.response.data.message, type: 'error' })
      )
    }
  })
}
export function* getCategoryList() {
  yield takeLatest(GET_CATEGORIES, function* () {
    try {
      const response = yield axios.get(`/products/categories`)
      const categories = yield response.data

      yield put(getCategoriesSuccess(categories))
    } catch (error) {
      yield put(
        setMessage({ content: error.response.data.message, type: 'error' })
      )
    }
  })
}

// function* getUser() {
//   yield takeLatest(GET_USER, function* () {
//     const { token } = yield select((state) => state.userReducer)
//     if (token) {
//       const response = yield axios.get('/users/')
//       const { user } = yield response.data

//       yield put(getUserSuccess(token, user))
//     }
//     yield cancel()
//   })
// }
