import React, { useEffect, useState } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { object, string } from 'yup'
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxHook'
import { changePassword } from '../../redux/action'

const passwordValidationSchema = object({
  oldPassword: string()
    .min(7, 'Password must have more than 7 character')
    .required(),
  newPassword: string()
    .min(7, 'Password must have more than 7 character')
    .required(),
  confirmPassword: string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.newPassword === value
    }
  ),
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
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}
const UserPasswordForm: React.VFC<{}> = () => {
  const classes = useStyles()
  const [data, setData] = useState('')

  const user = useAppSelector((state) => state.userReducer.user)
  useEffect(() => {
    if (user.email) {
      const { email } = user
      setData((prevState) => email)
    }
  }, [user])

  const dispatch = useAppDispatch()
  const handlePassword = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
	dispatch(changePassword(values))
    setTimeout(() => {
      action.setSubmitting(false)
    })
  }
  return (
    <>
      <Typography component="h4" variant="h4" align="center">
        Change Password
      </Typography>

      <Formik
        initialValues={initialValue}
        onSubmit={handlePassword}
        validationSchema={passwordValidationSchema}
      >
        {({ values, isSubmitting, dirty, isValid, errors }) => {
          return (
            <Form className={classes.form}>
              <input
                hidden
                type="text"
                value={data}
                autoComplete="username"
                name="username"
                readOnly
              />
              <Field
                name="oldPassword"
                type="password"
                label="Old Password"
                autoComplete="current-password"
                as={TextField}
                className={classes.field}
              />
              <Field
                name="newPassword"
                type="password"
                label="New Password"
                autoComplete="new-password"
                as={TextField}
                className={classes.field}
              />
              <Field
                name="confirmPassword"
                type="password"
                label="Confirm New Password"
                autoComplete="new-password"
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
                Change Password
              </Button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default UserPasswordForm
