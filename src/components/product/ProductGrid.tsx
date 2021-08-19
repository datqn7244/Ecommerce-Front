import clsx from 'clsx'
import { VFC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import queryString from 'query-string'
import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'

import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxHook'
import { getProducts } from '../../redux/action'
import CategoriesBar from './CategoriesBar'
import ProductCard from './ProductCard'
import useTitle from '../../custom-hooks/useTitle'
import { drawerWidth } from '../../App'
import FormikMuiSelect from '../utils/FormikMuiSelect'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      padding: theme.spacing(2),
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    field: {
      margin: theme.spacing(1),
      maxWidth: '70%',
      minWidth: theme.spacing(20),
    },
    select: {
      minWidth: theme.spacing(20),
    },
    pagination: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      '& > *': {
        marginTop: theme.spacing(2),
      },
      paddingBottom: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    paginationItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
)

const sortOptions = ['name-asc', 'name-desc', 'price-asc', 'price-desc']

const ProductGrid: VFC<{}> = () => {
  const classes = useStyles()
  const category = (useParams() as any).categoryName
  useTitle(category ? category : 'Simple Ecommerce')
  const dispatch = useAppDispatch()
  const { products, total } = useAppSelector((state) => state.productReducer)
  const [sortBy, setSortBy] = useState('name-asc')
  const [page, setPage] = useState(1)
  

  useEffect(() => {
    const query = queryString.stringify({ category, rowsPerPage: 12 })
    dispatch(getProducts(query))
    setPage(1)
  }, [category, dispatch])

  const handleSort = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string)
  }
  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    // const query = queryString.stringify({
    //   category,
    //   rowsPerPage: 12,
    //   page: value,
    // })
    // dispatch(getProducts(query))
	// history.push
  }

  return (
    <>
      <CategoriesBar sort={sortBy} page={page} />
      <div className={clsx(classes.header, classes.root)}>
        <Typography variant="h4">{category}</Typography>
        <FormikMuiSelect
          name="sortBy"
          type="select"
          label="Sort By"
          color="secondary"
          className={clsx(classes.field, classes.select)}
          value={sortBy}
          onChange={handleSort}
          options={sortOptions}
        />
      </div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.root}
        spacing={4}
      >
        {products.map((product) => (
          <Grid item key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.pagination}>
        <div className={classes.paginationItem}>
          <Typography>Page: {page}</Typography>
          <Pagination
            count={Math.ceil(total / 12)}
            page={page}
            onChange={handlePage}
          />
        </div>
      </div>
    </>
  )
}

export default ProductGrid
