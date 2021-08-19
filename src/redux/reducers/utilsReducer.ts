import { AllActions } from '../../types/reducerTypes'
import { UtilsState } from '../../types/reduxTypes'
import { SET_CATEGORIES_DRAWER, SET_MESSAGE } from '../action/utilsAction'

export const utilsState: UtilsState = {
  message: {
    content: '',
    type: 'default',
  },
  categoriesDrawer: false
}

const messageReducer = (
  state = utilsState,
  action: AllActions
): UtilsState => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      }
    case SET_CATEGORIES_DRAWER:
      return {
        ...state,
        categoriesDrawer: action.payload,
      }
    default:
      return state
  }
}

export default messageReducer
