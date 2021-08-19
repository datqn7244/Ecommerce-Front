import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer, { initialState } from './reducers'
import rootSaga from './saga'

// persist everything
// const persistedState = localStorage.getItem("state")
//   ? JSON.parse(localStorage.getItem("state"))
//   : initialState;

const sagaMiddleWare = createSagaMiddleware()
const middlewares = [sagaMiddleWare]
let composeEnhancers = compose
if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
  })
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
)
sagaMiddleWare.run(rootSaga)
store.subscribe(() => {
  if (store.getState().userReducer.token) {
    localStorage.setItem(
      'token',
      JSON.stringify(store.getState().userReducer.token)
    )
    localStorage.setItem(
      'user',
      JSON.stringify(store.getState().userReducer.user)
    )
  }
  localStorage.setItem(
	  'cart', JSON.stringify(store.getState().productReducer.cart)
  )
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
