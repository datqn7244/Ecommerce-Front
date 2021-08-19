import { VFC } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import { object, string } from 'yup'
import axios from 'axios'

import { useAppDispatch } from '../../custom-hooks/reduxHook'
import { getCategories } from '../../redux/action'
const validationSchema = object({
  name: string().required('Category name is required'),
})

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '30vw',
    padding: 'auto',
    margin: 'auto',
  },
  field: {
    margin: theme.spacing(1),
  },
}))

const initialValue = {
  name: '',
}
const CategoryForm: VFC<{
  open: boolean
  setOpen: (value: React.SetStateAction<boolean>) => void
}> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
    await axios.post('/products/categories', values)
	dispatch(getCategories())
	handleClose()
    setTimeout(() => {
      action.setSubmitting(false)
    }, 0)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new Category</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValue}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, isSubmitting, dirty, isValid, errors }) => {
              return (
                <Form className={classes.form}>
                  <Field
                    name="name"
                    type="text"
                    label="Category Name"
                    as={TextField}
                    className={classes.field}
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

export default CategoryForm
