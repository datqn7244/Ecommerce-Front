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
import {  updateUser } from '../../redux/action'

const profileValidationSchema = object({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  email: string().email().required('Email is required'),
  address: string().required('Address is required'),
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
}
const UserProfileForm: React.VFC<{}> = () => {
  const [data, setData] = useState(initialValue)
  const user = useAppSelector((state) => state.userReducer.user)
  useEffect(() => {
    if (user.email) {
      const { firstName, lastName, email, address } = user
      setData({ firstName, lastName, email, address })
    }
  }, [user])
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const handleProfile = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
    dispatch(updateUser(values))
    setTimeout(() => {
      action.setSubmitting(false)
    })
  }
  return (
    <>
      <Typography component="h4" variant="h4" align="center">
        Update Profile
      </Typography>

      <Formik
        initialValues={data}
        onSubmit={handleProfile}
        validationSchema={profileValidationSchema}
        enableReinitialize
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.field}
                disabled={isSubmitting || !dirty || !isValid}
              >
                Update
              </Button>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default UserProfileForm
