import { Link } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  IconButton,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  Typography,
  Link as MuiLink,
  Button,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import AddIcon from '@material-ui/icons/AddCircleOutline'
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline'

import { SideDrawerProps } from '../types/components'
import { Product } from '../types/reduxTypes'
import { useAppDispatch, useAppSelector } from '../custom-hooks/reduxHook'

import { updateCart } from '../redux/action'

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    minWidth: 400,
    // maxHeight: `calc(100% - ${theme.spacing(20)}px)`,
    marginBottom: theme.spacing(20),
    overflow: 'auto',
  },
  fullList: {
    width: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'flex-end',
    '@media (max-width:600px)': {
      padding: '4px 8px',
    },
  },
  img: {
    maxWidth: 200,
    maxHeight: 100,
  },
  cartAction: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  checkout: {
    position: 'absolute',
    bottom: 0,
    height: theme.spacing(20),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  checkoutButton: {
    alignSelf: 'center',
  },
  red: {
    color: 'red',
  },
}))

const SideDrawer: React.VFC<SideDrawerProps> = ({
  drawer,
  toggleDrawer,
  anchor,
}) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { cart } = useAppSelector((state) => state.productReducer)
  const handleAddToCart = (product: Product, variant: string) => {
    dispatch(updateCart({ product, type: 'add', variant }))
  }
  const handleRemoveFromCart = (product: Product, variant: string) => {
    dispatch(updateCart({ product, type: 'remove', variant }))
  }
  return (
    <Drawer anchor={anchor} open={drawer} onClose={toggleDrawer(false)}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.list} role="presentation">
        <List>
          {cart.map(({ product, quantity, variant }) => {
            return (
              <ListItem key={`${product._id}-${variant}`} >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <MuiLink
                    component={Link}
                    to={`/product/${product.name}/${product._id}`}
                    color="inherit"
                  >
                    <Grid
                      item
                      container
                      direction="column"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Grid item>
                        <Typography>{product.name}</Typography>
                      </Grid>
                      <Grid item>
                        <img
                          src={
                            product.images[0]
                              ? product.images[0].dataURL
                              : 'https://via.placeholder.com/300/09f/fff.png'
                          }
                          alt={product.name}
                          className={classes.img}
                        />
                      </Grid>
                    </Grid>
                  </MuiLink>
                  <div className={classes.cartAction}>
                    <Grid item>
                      <Typography>Variant: {variant}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Price: {product.price * quantity}</Typography>
                    </Grid>
                    <Grid className={classes.quantity}>
                      <IconButton
                        onClick={() => handleRemoveFromCart(product, variant)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>Quantity: {quantity}</Typography>
                      <IconButton
                        onClick={() => handleAddToCart(product, variant)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  </div>
                </Grid>
              </ListItem>
            )
          })}
        </List>
      </div>
      <div className={classes.checkout}>
        <Typography variant="h5">Total:</Typography>
        <Typography variant="h4" className={classes.red}>
          {cart.reduce((accumulator, { product, quantity }) => {
            return accumulator + product.price * quantity
          }, 0)}
        </Typography>
        <Button
          className={classes.checkoutButton}
          fullWidth
          variant="contained"
          color="secondary"
        >
          Check out
        </Button>
      </div>
    </Drawer>
  )
}

export default SideDrawer
