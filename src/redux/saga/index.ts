import { all, fork } from 'redux-saga/effects'

import { getCategoryList, getProduct, getProductList } from './productSaga'
import { changePassword, clearCredential, getUser, signinUser, signinWithGoogle, signupUser, updateUser } from './userSaga'

function* rootSaga() {
  yield all([
    fork(getProduct),
    fork(getProductList),
	fork(getCategoryList),
    fork(clearCredential),
    fork(signinUser),
    fork(signupUser),
    fork(signinWithGoogle),
    fork(getUser),
    fork(updateUser),
    fork(changePassword),
  ])
}
export default rootSaga
