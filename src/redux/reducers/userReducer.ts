import { AllActions } from '../../types/reducerTypes'
import { User, UserState } from '../../types/reduxTypes'
import { GET_USER_SUCCESS, SET_TOKEN } from '../action'

export const userState: UserState = {
  user: localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : {} as User,
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token')!)
    : '',
}

const userReducer = (state = userState, action: AllActions): UserState => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      }
    default:
      return state
  }
}

export default userReducer
