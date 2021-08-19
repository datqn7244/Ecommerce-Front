import { ImageListType } from 'react-images-uploading'
//   Redux

export type ReducerState = {
  userReducer: UserState
  utilsReducer: UtilsState
  productReducer: ProductState
}

export type UtilsState = {
  message: {
    content: string
    type: 'default' | 'success' | 'error' | 'warning' | 'info'
  }
  categoriesDrawer: boolean
}
export type ProductState = {
  product: Product
  products: Product[]
  cart: Cart
  categories: Category[]
  total: number
}
export type UserState = {
  user: User
  token: string
}

export type Signin = {
  email: string
  password?: string
}

export interface Signup extends Signin {
  firstName: string
  lastName: string
  address: string
}

export interface User extends Signup {
  role: 'User' | 'Admin'
  _id: string
  ban?: {
    created: string
    expired: string
    reason?: string
  }
}

export type UpdatePassword = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type Product = {
  _id: string
  name: string
  description: string
  price: number
  variants: string[]
  categories: Category[]
  images: ImageListType
}

export type Cart = {
    product: Product
    quantity: number
	variant: string
  }[]


export type Category = {
  _id: string
  name: string
}

export type CartChange = 'add' | 'remove'
