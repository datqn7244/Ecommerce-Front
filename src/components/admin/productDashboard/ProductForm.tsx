import axios from 'axios'
import { VFC } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { object, string, number, array } from 'yup'
import { ImageListType } from 'react-images-uploading'

import { useAppDispatch, useAppSelector } from '../../../custom-hooks/reduxHook'
import { getProducts, setMessage } from '../../../redux/action'
import FormikMuiCategoriesSelect from '../../utils/FormikMuiCategoriesSelect'
import { Product } from '../../../types/reduxTypes'
import ImageUploader from '../../utils/ImageUploader'

const validationSchema = object({
  name: string().required('name is required'),
  description: string().required(),
  price: number().positive().required(),
  variants: string(),
  categories: array().of(string()).required(),
  images: array().of(object()),
})

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '30vw',
    minWidth: '400px',
    padding: 'auto',
    margin: 'auto',
  },
  field: {
    margin: theme.spacing(1),
  },
}))
const ProductForm: VFC<{
  open: boolean
  setOpen: (value: React.SetStateAction<boolean>) => void
  product?: Product
}> = ({ open, setOpen, product }) => {
  const dispatch = useAppDispatch()
  const { search } = useLocation()
  const classes = useStyles()
  const categories = useAppSelector((state) => state.productReducer.categories)
  const maxNumber = 5
  let initialValue = {
    name: '',
    description: '',
    price: 0,
    variants: '',
    categories: [] as string[],
    images: [] as ImageListType,
  }
  if (product?.name) {
    initialValue = {
      name: product.name,
      description: product.description,
      price: product.price,
      variants: product.variants.join('\n'),
      categories: product.categories.map((category) => category._id),
      images: product.images,
    }
  }
  const handleSubmit = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
    const imagesData = values.images.map((image) => ({
      dataURL: image.dataURL,
      file: {
        name: image.file?.name,
        size: image.file?.size,
        type: image.file?.type,
        lastModified: image.file?.lastModified,
      },
    }))
    const submitValues = {
      ...values,
      variants: values.variants.trim().split('\n'),
      images: imagesData,
    }
    handleFormSubmit(submitValues)
    setTimeout(() => {
      action.setSubmitting(false)
    }, 0)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleFormSubmit = async (form: object) => {
    try {
      if (product) {
        await axios.put(`/products/${product?._id}`, form)
      } else {
        await axios.post('products/', form)
      }
      dispatch(getProducts(search.slice(1)))
      handleClose()
    } catch (error) {
      dispatch(
        setMessage({ content: error.response.data.message, type: 'error' })
      )
    }
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {product ? 'Update Product' : 'Add new Product'}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValue}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              isSubmitting,
              dirty,
              isValid,
              errors,
              setFieldValue,
            }) => {
              return (
                <Form className={classes.form}>
                  <Field
                    name="name"
                    type="text"
                    label="Name"
                    as={TextField}
                    className={classes.field}
                  />
                  <Field
                    name="description"
                    type="text"
                    label="Description"
                    multiline
                    as={TextField}
                    className={classes.field}
                  />
                  <Field
                    name="price"
                    type="number"
                    label="Price"
                    as={TextField}
                    className={classes.field}
                  />
                  <Field
                    name="variants"
                    type="select"
                    label="Variants (one on each line)"
                    as={TextField}
                    maxRows={20}
                    multiline
                    className={classes.field}
                  />
                  <Field
                    name="categories"
                    type="select"
                    label="Categories"
                    as={FormikMuiCategoriesSelect}
                    className={classes.field}
                    options={categories.map((category) => ({
                      label: category.name,
                      value: category._id,
                    }))}
                  />
                  <Field
                    name="images"
                    type="file"
                    label="Images"
                    as={ImageUploader}
                    className={classes.field}
                    images={values.images}
                    setImages={setFieldValue}
                    maxNumber={maxNumber}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.field}
                    disabled={isSubmitting || !dirty || !isValid}
                  >
                    Submit
                  </Button>
                </Form>
              )
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ProductForm
