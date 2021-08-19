import { Product } from './reduxTypes'

type FunctionalIconProps = {
  state: boolean
  title1: string
  title2: string
  label: string
  toggle?: () => void
  icon1: JSX.Element
  icon2: JSX.Element
  classes?: any
}

type NavClassesProps = {
  classes: {
    title: string
    anchor: string
    cartButton: string
    root: string
    button: string
  }
}

interface CartButtonProps extends NavClassesProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

type Order = 'asc' | 'desc'

type TableProps<T> = {
  order: Order
  orderBy: keyof T
  page: number
  rowsPerPage: number
}

type HeadCell<T> = {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric?: boolean
  sort: boolean
  align?: 'left' | 'right' | 'center'
}
