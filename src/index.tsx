import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'

import './index.css'
import App from './App'
import store from './redux/store'
import CustomThemeProvider from './themes/CustomThemeProvider'
import { clearToken } from './redux/action'

const token = store.getState().userReducer.token
if (token) {
  const decodedToken = jwtDecode(token)
  const currentDate = new Date()
  // JWT exp is in seconds
  if ((decodedToken as any).exp * 1000 < currentDate.getTime()) {
    store.dispatch(clearToken())
  }
} else {
  store.dispatch(clearToken())
}

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
axios.interceptors.request.use(function (config) {
  const token = store.getState().userReducer.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
axios.interceptors.response.use(undefined, function (error) {
  if (
    error.response.status === 401 ||
    error.response.data.message === 'Unauthorized'
  ) {
    store.dispatch(clearToken())
  }
  return Promise.reject(error)
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <App />
        </SnackbarProvider>
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
