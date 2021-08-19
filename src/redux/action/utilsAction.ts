import { SetCategoriesDrawer, SetMessage } from '../../types/reducerTypes'

export const SET_MESSAGE = 'SET_MESSAGE'
export const SET_CATEGORIES_DRAWER = 'SET_CATEGORIES_DRAWER'

export const setMessage = (message: {
  content: string
  type: string
}): SetMessage => {
  return {
    type: SET_MESSAGE,
    payload: message,
  }
}
export const setCategoriesDrawer = (open: boolean): SetCategoriesDrawer => {
  return {
    type: SET_CATEGORIES_DRAWER,
    payload: open,
  }
}
