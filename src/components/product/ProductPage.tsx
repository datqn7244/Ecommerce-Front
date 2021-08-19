import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import axios from 'axios'
import { ChangeEvent, useEffect, useState, VFC } from 'react'
import { useParams } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { drawerWidth } from '../../App'
import { Product } from '../../types/reduxTypes'
import CategoriesBar from './CategoriesBar'
import { useAppDispatch } from '../../custom-hooks/reduxHook'
import { updateCart } from '../../redux/action'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    padding: theme.spacing(2),
  },
  paper: {
    maxWidth: theme.spacing(150),
    margin: 'auto',
    padding: theme.spacing(4),
  },
  image: {
    width: theme.spacing(60),
    height: 'auto',
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    marginTop: theme.spacing(5),
    padding: theme.spacing(4),
    lineHeight: '2em',
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  red: {
    color: 'red',
  },
}))

const ProductPage: VFC<{}> = () => {
  const params = useParams()
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { productId } = params as Record<string, string>
  const [product, setProduct] = useState({} as Product)
  const [variant, setVariant] = useState('')
  useEffect(() => {
    axios.get(`/products/${productId}`).then((response) => {
      setProduct(response.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (product.variants) {
      setVariant(product.variants[0])
    }
  }, [product])
  const handleVariant = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setVariant(value)
  }

  const handleAddToCart = () => {
    dispatch(updateCart({ product, type: 'add', variant }))
  }
  return (
    <>
      <CategoriesBar />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {product.name ? (
            <>
              <div className={classes.top}>
                {product.images.length ? (
                  //   product.images.map((image) => (
                  <img
                    key={product.images[0].file?.name}
                    src={product.images[0].dataURL}
                    alt={product.name}
                    className={classes.image}
                  />
                ) : // ))
                null}
                <div className={classes.productInfo}>
                  <Typography variant="h4">{product.name}</Typography>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" color="secondary">
                      Product Variant
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      value={variant}
                      onChange={handleVariant}
                    >
                      {product.variants.map((variant) => (
                        <FormControlLabel
                          key={variant}
                          value={variant}
                          control={<Radio color="secondary" />}
                          label={variant}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <Typography variant="h3" className={classes.red}>
                    {product.price}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
                    disabled={!Boolean(variant)}
                  >
                    Add to cart <ShoppingCartIcon />
                  </Button>
                </div>
              </div>
              <div className={classes.bottom}>
                {product.description.split('\n').map((line, index) => {
                  return (
                    <Typography
                      variant="subtitle1"
                      color="inherit"
                      component="p"
                      key={index}
                    >
                      {line}
                    </Typography>
                  )
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </Paper>
      </div>
    </>
  )
}

export default ProductPage
