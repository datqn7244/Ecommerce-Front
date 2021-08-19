import {
	ChangePassword,
  ClearToken,
  GetUser,
  GetUserSuccess,
  SetToken,
  SigninUser,
  SigninWithGoogle,
  SignupUser,
  UpdateUser,
} from '../../types/reducerTypes'
import {
  User,
  Signin,
  Signup,
  UpdatePassword,
} from '../../types/reduxTypes'


export const SET_TOKEN = 'SET_TOKEN'
export const CLEAR_TOKEN = 'CLEAR_TOKEN'
export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNIN_GOOGLE = 'SIGNIN_GOOGLE'
export const SIGNUP_USER = 'SIGNUP_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'

export const signinUser = (credential: Signin): SigninUser => {
  return {
    type: SIGNIN_USER,
    payload: credential,
  }
}
export const signinWithGoogle = (id_token: string): SigninWithGoogle => {
  return {
    type: SIGNIN_GOOGLE,
    payload: { id_token },
  }
}
export const signupUser = (credential: Signup): SignupUser => {
  return {
    type: SIGNUP_USER,
    payload: credential,
  }
}
export const updateUser = (credential: Signup): UpdateUser => {
  return {
    type: UPDATE_USER,
    payload: credential,
  }
}
export const changePassword = (credential: UpdatePassword): ChangePassword => {
  return {
    type: CHANGE_PASSWORD,
    payload: credential,
  }
}

export const setToken = (token: string): SetToken => {
  return {
    type: SET_TOKEN,
    payload: token,
  }
}
export const clearToken = (): ClearToken => {
  return {
    type: CLEAR_TOKEN
  }
}

export const getUser = (): GetUser => {
  return {
    type: GET_USER,
  }
}

export const getUserSuccess = (token: string, user: User): GetUserSuccess => {
  return {
    type: GET_USER_SUCCESS,
    payload: { token, user },
  }
}