import axios from 'axios'
import clsx from 'clsx'
import queryString from 'query-string'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { VFC, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { useAppDispatch, useAppSelector } from '../../../custom-hooks/reduxHook'
import { getCategories, getProducts, setMessage } from '../../../redux/action'
import ProductTable from './ProductTable'
import FormikMuiSelect from '../../utils/FormikMuiSelect'
import ProductForm from './ProductForm'
import { HeadCell, Order, TableProps } from '../../../types/utils'
import { Product } from '../../../types/reduxTypes'
import useTitle from '../../../custom-hooks/useTitle'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '90%',
    padding: 'auto',
    margin: 'auto',
  },
  field: {
    margin: theme.spacing(1),
    maxWidth: '70%',
  },
  select: {
    minWidth: theme.spacing(20),
  },
  button: {
    marginRight: theme.spacing(10),
  },
}))

const initialValue = {
  name: '',
  category: '',
}

const headCells: HeadCell<Product>[] = [
  {
    id: 'images',
    align: 'center',
    disablePadding: true,
    label: 'Images',
    sort: false,
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    sort: true,
  },
  {
    id: 'categories',
    numeric: false,
    disablePadding: false,
    label: 'Categories',
    sort: false,
  },
  {
    id: 'variants',
    numeric: false,
    disablePadding: false,
    label: 'Variants',
    sort: false,
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
    sort: true,
  },
]
const ProductList: VFC<{}> = () => {
  useTitle('Product Dashboard')
  const [options, setOptions] = useState([''])
  const [value, setValue] = useState(initialValue)
  const [open, setOpen] = useState(false)
  const [tableProps, setTableProps] = useState<TableProps<Product>>({
    order: 'asc',
    orderBy: 'name',
    page: 0,
    rowsPerPage: 10,
  })
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const history = useHistory()
  const { search } = useLocation()
  const { categories, products, total } = useAppSelector(
    (state) => state.productReducer
  )

  //   Retrieve query from URL
  useEffect(() => {
    const { name, category, sort, page, rowsPerPage } =
      queryString.parse(search)
    if (sort) {
      const [orderBy, order] = (sort as string).split('-')
      setTableProps((state) => ({
        order: order ? (order as Order) : state.order,
        orderBy: orderBy ? (orderBy as keyof Product) : state.orderBy,
        page: page ? Number(page) - 1 : state.page,
        rowsPerPage: rowsPerPage ? Number(rowsPerPage) : state.rowsPerPage,
      }))
    }
    setValue({
      name: (name as string) || '',
      category: (category as string) || '',
    })
    setOptions(Boolean(category) ? [category as string] : [''])
    setTableProps((state) => ({
      ...state,
      page: page ? Number(page) - 1 : state.page,
      rowsPerPage: rowsPerPage ? Number(rowsPerPage) : state.rowsPerPage,
    }))
    dispatch(getCategories())
    dispatch(getProducts(search))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //   Update URL
  useEffect(() => {
    const { name, category } = queryString.parse(search)
    const { order, orderBy, page, rowsPerPage } = tableProps
    const values = {
      name,
      category,
      sort: `${orderBy}-${order}`,
      page: page + 1,
      rowsPerPage,
    }
    const query = queryString.stringify(values)
    history.push(`?${query}`)
    dispatch(getProducts(query))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableProps])
  //  Get list of categories
  useEffect(() => {
    if (categories.length) {
      setOptions([''].concat(categories.map((category) => category.name)))
    }
  }, [categories])

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(`/products/${productId}`)
      dispatch(getProducts(search))
    } catch (error) {
      dispatch(
        setMessage({ content: error.response.data.message, type: 'error' })
      )
    }
  }
  const handleSubmit = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
    const { order, orderBy, page, rowsPerPage } = tableProps
    const newValues = {
      ...values,
      sort: `${orderBy}-${order}`,
      page: page + 1,
      productsPerPage: rowsPerPage,
    }
    const query = queryString.stringify(newValues)
    dispatch(getProducts(query))
    history.push(`?${queryString.stringify(values)}`)
    setTableProps((state) => ({
      ...state,
      page: 0,
    }))

    setTimeout(() => {
      action.setSubmitting(false)
    })
  }
  return (
    <div className={classes.root}>
      <Formik initialValues={value} onSubmit={handleSubmit} enableReinitialize>
        {({ isSubmitting, isValid }) => {
          return (
            <Form className={classes.form}>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => setOpen(true)}
              >
                Add new product
              </Button>
              <Field
                name="name"
                type="text"
                label="Name"
                color="secondary"
                fullWidth
                as={TextField}
                className={classes.field}
              />
              <Field
                name="category"
                type="select"
                label="Category"
                color="secondary"
                as={FormikMuiSelect}
                className={clsx(classes.field, classes.select)}
                options={options}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.field}
                disabled={isSubmitting || !isValid}
              >
                Submit
              </Button>
            </Form>
          )
        }}
      </Formik>
      <ProductTable
        products={products}
        tableProps={tableProps}
        setTableProps={setTableProps}
        headCells={headCells}
        total={total}
        handleDeleteProduct={handleDeleteProduct}
      />
      <ProductForm open={open} setOpen={setOpen} />
    </div>
  )
}

export default ProductList
