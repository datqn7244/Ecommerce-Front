import { Link } from 'react-router-dom'
import React from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { TextField, Button, Theme, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { object, string } from 'yup'

import GoogleLoginButton from './GoogleLoginButton'
import { useAppDispatch } from '../../custom-hooks/reduxHook'
import { signinUser } from '../../redux/action'
import useTitle from '../../custom-hooks/useTitle'

const validationSchema = object({
  email: string().email().required(),
  password: string().required(),
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
  email: '',
  password: '',
}
function SigninForm() {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  useTitle('Sign in!')
  const handleSubmit = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
    dispatch(signinUser(values))
    setTimeout(() => {
      action.setSubmitting(false)
    })
  }
  return (
    <Paper elevation={1} className={classes.paper}>
      <Typography variant="h4" align="center">
        Sign in
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
				autoComplete="current-password"
                as={TextField}
                className={classes.field}
              />
              <Typography variant="body2" align="right">
                <Link to="/forgot-password" className={classes.anchor}>
                  Forgot your password?
                </Link>
              </Typography>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.field}
                disabled={isSubmitting || !dirty || !isValid}
              >
                Sign in
              </Button>
            </Form>
          )
        }}
      </Formik>
      <GoogleLoginButton text="Login with Google" />
      <Typography variant="body1" align="center" className={classes.create}>
        New to the site?.
        <Link to="/signup" className={classes.anchor}>
          Create an account.
        </Link>
      </Typography>
    </Paper>
  )
}

export default SigninForm
