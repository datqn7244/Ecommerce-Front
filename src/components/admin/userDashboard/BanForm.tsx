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
import { number, object, string } from 'yup'
import axios from 'axios'
import { User } from '../../../types/reduxTypes'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '../../../custom-hooks/reduxHook'
import { setMessage } from '../../../redux/action'

const validationSchema = object({
  reason: string(),
  days: number().required(),
})

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '40vw',
    minWidth: 400,
    padding: 'auto',
    margin: 'auto',
  },
  field: {
    margin: theme.spacing(1),
  },
}))

const initialValue = {
  reason: '',
  days: 0,
}
const BanForm: VFC<{
  open: boolean
  setOpen: (value: React.SetStateAction<boolean>) => void
  user: User
  getUsers: (query: string) => void
}> = ({ open, setOpen, user, getUsers }) => {
  const classes = useStyles()
  const { search } = useLocation()
	const dispatch = useAppDispatch()
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
    try {
      await axios.post('/admin/ban_user', {
        ...values,
        userId: user._id,
      })
    } catch (error) {
		dispatch(setMessage({ content: error.response.data.message, type: 'error' }))
	}
    getUsers(search)
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
        <DialogTitle id="form-dialog-title">User profile </DialogTitle>
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
                    name="reason"
                    type="text"
                    label="Reason"
                    as={TextField}
                    className={classes.field}
                  />
                  <Field
                    name="days"
                    type="number"
                    label="Length of ban (days)"
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

export default BanForm
