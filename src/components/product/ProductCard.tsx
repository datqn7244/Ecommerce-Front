import React, { ChangeEvent, useState, VFC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Link as MuiLink,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core'
import TextTruncate from 'react-text-truncate'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Link } from 'react-router-dom'
import { Product } from '../../types/reduxTypes'
import { useAppDispatch } from '../../custom-hooks/reduxHook'
import { updateCart } from '../../redux/action'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    link: {
      height: theme.spacing(40) - 36,
    },
    header: {
      fontWeight: 600,
      maxHeight: theme.spacing(7),
    },
    content: {},
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    red: {
      color: 'red',
    },
    button: {},
    variant: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  })
)

const ProductCard: VFC<{ product: Product }> = ({ product }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [variant, setVariant] = useState(product.variants[0])
  const handleAddToCart = () => {
    dispatch(
      updateCart({
        product,
        type: 'add',
        variant,
      })
    )
  }
  const handleVariant = (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setVariant(value)
  }
  return (
    <>
      <Card className={classes.root}>
        <MuiLink
          component={Link}
          to={`/product/${product.name}/${product._id}`}
          underline="none"
          color="inherit"
        >
          {product.images.length ? (
            <CardMedia
              className={classes.media}
              image={product.images[0].dataURL}
              title={product.name}
            />
          ) : (
            <CardMedia
              className={classes.media}
              image="https://via.placeholder.com/300/09f/fff.png"
              title={product.name}
            />
          )}
          <CardHeader
            title={
              <TextTruncate
                line={2}
                element="span"
                truncateText="…"
                text={product.name}
              />
            }
            className={classes.header}
            titleTypographyProps={{
              variant: 'subtitle1',
              className: classes.header,
            }}
            disableTypography
          />
          <CardContent className={classes.content}>
            <Typography variant="h4" className={classes.red} component="p">
              {product.price}
            </Typography>
          </CardContent>
        </MuiLink>
        <FormControl component="fieldset" className={classes.variant}>
          <FormLabel component="legend" color="secondary" focused={false}>
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
        <Button
          onClick={handleAddToCart}
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          <ShoppingCartIcon /> Add to Cart
        </Button>
      </Card>
    </>
  )
}
export default ProductCard
