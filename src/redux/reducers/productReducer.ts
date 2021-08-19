import { AllActions } from '../../types/reducerTypes'
import { ProductState, Product, Cart, Category } from '../../types/reduxTypes'
import {
  GET_CATEGORIES_SUCCESS,
  GET_ONE_PRODUCT_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  UPDATE_CART,
} from '../action'

export const productState: ProductState = {
  product: {} as Product,
  products: [] as Product[],
  cart: localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')!)
    : ([] as Cart),
  categories: [] as Category[],
  total: 0,
}

const userReducer = (
  state = productState,
  action: AllActions
): ProductState => {
  switch (action.type) {
    case GET_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        total: action.payload.total,
      }
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      }
    case UPDATE_CART:
      const item = state.cart.find(
        (element) =>
          element.product.name === action.payload.product.name &&
          element.variant === action.payload.variant
      )
      if (item) {
        switch (action.payload.type) {
          case 'add':
            return {
              ...state,
              cart: state.cart.map((element) => {
                if (element === item) {
                  element.quantity++
                }
                return element
              }),
            }

          case 'remove':
            return {
              ...state,
              cart: state.cart
                .map((element) => {
                  if (element === item) {
                    element.quantity--
                  }
                  return element
                })
                .filter((element) => element.quantity > 0),
            }

          default:
            return state
        }
      }
      return {
        ...state,
        cart: state.cart.concat({
          product: action.payload.product,
          quantity: 1,
		  variant: action.payload.variant
        }),
      }

    default:
      return state
  }
}

export default userReducer
