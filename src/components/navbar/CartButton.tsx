import { Badge, IconButton, Tooltip } from '@material-ui/core'
import React from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import clsx from 'clsx'
import { CartButtonProps } from '../../types/utils'
import { useAppSelector } from '../../custom-hooks/reduxHook'

const CartButton: React.VFC<CartButtonProps> = ({ toggleDrawer, classes }) => {
  const { cart } = useAppSelector((state) => state.productReducer)
  return (
    <Tooltip title="Cart">
      <IconButton
        edge="start"
        className={clsx(classes.cartButton, classes.button)}
        color="inherit"
        aria-label="Cart"
        onClick={toggleDrawer(true)}
      >
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}

export default CartButton
