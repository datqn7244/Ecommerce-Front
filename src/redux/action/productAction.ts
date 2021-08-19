import { CartChange } from './../../types/reduxTypes.d'
import {
  GetCategories,
  GetCategoriesSuccess,
  GetProducts,
  GetProductsSuccess,
  GetSingleProduct,
  GetSingleProductSuccess,
  UpdateCart,
} from '../../types/reducerTypes'
import { Category, Product } from '../../types/reduxTypes'

export const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'
export const GET_ONE_PRODUCT_SUCCESS = 'GET_ONE_PRODUCT_SUCCESS'
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const UPDATE_CART = 'UPDATE_CART'

export const getSingleProduct = (productId: string): GetSingleProduct => {
  return {
    type: GET_ONE_PRODUCT,
    payload: productId,
  }
}
export const getSingleProductSuccess = (
  product: Product
): GetSingleProductSuccess => {
  return {
    type: GET_ONE_PRODUCT_SUCCESS,
    payload: product,
  }
}
export const getProducts = (query?: string): GetProducts => {
  return {
    type: GET_PRODUCTS,
    payload: query,
  }
}
export const getProductsSuccess = (
  products: Product[],
  total: number
): GetProductsSuccess => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: { products, total },
  }
}
export const getCategories = (): GetCategories => {
  return {
    type: GET_CATEGORIES,
  }
}
export const getCategoriesSuccess = (
  categories: Category[]
): GetCategoriesSuccess => {
  return {
    type: GET_CATEGORIES_SUCCESS,
    payload: categories,
  }
}
export const updateCart = (change: {
  product: Product
  type: CartChange
  variant: string
}): UpdateCart => {
  return {
    type: UPDATE_CART,
    payload: change,
  }
}
