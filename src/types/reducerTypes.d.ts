import {
  GET_COUNTRY_WITH_SAGA,
  GET_ALL_COUNTRIES_SUCCESS,
  GET_COUNTRY_SUCCESS,
  RESET_COUNTRY_SUCCESS,
  MANAGE_FAVORITE_COUNTRIES,
  SET_TOKEN,
  SIGNIN_USER,
  UPDATE_USER,
  CHANGE_PASSWORD,
  CLEAR_TOKEN,
} from '../redux/action'
import { SET_CATEGORIES_DRAWER, SET_MESSAGE } from '../redux/action/utilsAction'
import {
  GET_ONE_PRODUCT,
  GET_ONE_PRODUCT_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  UPDATE_CART,
} from '../redux/action/productAction'
import { Cart, Category, Product } from './reduxTypes'

export type SetMessage = {
  type: typeof SET_MESSAGE
  payload: {
    content: string
    type: string
  }
}
export type SetCategoriesDrawer = {
  type: typeof SET_CATEGORIES_DRAWER
  payload: boolean
}
export type SigninUser = {
  type: typeof SIGNIN_USER
  payload: Signin
}

export type SigninWithGoogle = {
  type: typeof SIGNIN_GOOGLE
  payload: { id_token: string }
}

export type SignupUser = {
  type: typeof SIGNUP_USER
  payload: Signup
}

export type UpdateUser = {
  type: typeof UPDATE_USER
  payload: Signup
}

export type ChangePassword = {
  type: typeof CHANGE_PASSWORD
  payload: UpdatePassword
}

export type SetToken = {
  type: typeof SET_TOKEN
  payload: string
}
export type ClearToken = {
  type: typeof CLEAR_TOKEN
}

export type GetUser = {
  type: typeof GET_USER
}

export type GetUserSuccess = {
  type: typeof GET_USER_SUCCESS
  payload: {
    token: string
    user: User
  }
}

export type GetSingleProduct = {
  type: typeof GET_ONE_PRODUCT
  payload: string
}
export type GetSingleProductSuccess = {
  type: typeof GET_ONE_PRODUCT_SUCCESS
  payload: Product
}
export type GetProducts = {
  type: typeof GET_PRODUCTS
  payload: string | undefined
}
export type GetProductsSuccess = {
  type: typeof GET_PRODUCTS_SUCCESS
  payload: { products: Product[]; total: number }
}
export type GetCategories = {
  type: typeof GET_CATEGORIES_SUCCESS
}
export type GetCategoriesSuccess = {
  type: typeof GET_CATEGORIES_SUCCESS
  payload: Category[]
}

export type UpdateCart = {
  type: typeof UPDATE_CART
  payload: {
    product: Product
    type: CartChange
	variant: string
  }
}
export type AllActions =
  | SetUser
  | SigninUser
  | SignupUser
  | UpdateUser
  | ChangePassword
  | SetToken
  | GetUser
  | GetUserSuccess
  | GetSingleProduct
  | GetSingleProductSuccess
  | GetProducts
  | GetProductsSuccess
  | GetCategories
  | GetCategoriesSuccess
