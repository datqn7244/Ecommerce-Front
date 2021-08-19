import { Link } from 'react-router-dom'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  Paper,
  Typography,
} from '@material-ui/core'
import { object, string } from 'yup'
import GoogleLoginButton from './GoogleLoginButton'

import { useAppDispatch } from '../../custom-hooks/reduxHook'
import { signupUser } from '../../redux/action'
import useTitle from '../../custom-hooks/useTitle'

const validationSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string().email().required('Email is required'),
  address: string().required('Address is required'),
  password: string()
    .min(7, 'Password must have more than 7 character')
    .required(),
})

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    marginRight: '30vw',
    marginLeft: '30vw',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '40vw',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: 'auto',
    margin: '1vh 5vw',
  },
  field: {
    margin: theme.spacing(1),
  },
  anchor: {
    color: '#9b9be8',
  },
  create: {
    marginTop: theme.spacing(2),
  },
}))

const initialValue = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  password: '',
}
function SignupForm() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  useTitle('Sign up!')
  const handleSubmit = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
    dispatch(signupUser(values))
    setTimeout(() => {
      action.setSubmitting(false)
    })
  }
  return (
    <Paper elevation={1} className={classes.paper}>
      <Typography component="h4" variant="h4" align="center">
        Sign up
      </Typography>

      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting, dirty, isValid, errors }) => {
          return (
            <Form className={classes.form}>
              <Field
                name="firstName"
                type="text"
                label="First Name"
                as={TextField}
                className={classes.field}
              />
              <Field
                name="lastName"
                type="text"
                label="Last Name"
                as={TextField}
                className={classes.field}
              />
              <Field
                name="address"
                type="address"
                label="Address"
                as={TextField}
                className={classes.field}
              />
              <Field
                name="email"
                type="email"
                label="Email"
                as={TextField}
                className={classes.field}
              />
              <Field
                name="password"
                type="password"
                label="Password"
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
                Sign up
              </Button>
            </Form>
          )
        }}
      </Formik>
      <GoogleLoginButton text="Signup with Google" />
	  <Typography variant="body1" align="center" className={classes.create}>
        Already have an account? {' '}
        <Link to="/signin" className={classes.anchor}>
           Sign in.
        </Link>
      </Typography>

    </Paper>
  )
}

export default SignupForm
