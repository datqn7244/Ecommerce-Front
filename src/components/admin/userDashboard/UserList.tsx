import axios from 'axios'
import queryString from 'query-string'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { VFC, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { useAppDispatch } from '../../../custom-hooks/reduxHook'
import { setMessage } from '../../../redux/action'
import { HeadCell, Order, TableProps } from '../../../types/utils'
import { User } from '../../../types/reduxTypes'
import UserTable from './UserTable'
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
  firstName: '',
  lastName: '',
  email: '',
}

const headCells: HeadCell<User>[] = [
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First Name',
    sort: true,
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
    sort: true,
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
    sort: true,
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Adress',
    sort: false,
  },
  {
    id: 'ban',
    numeric: false,
    disablePadding: false,
    label: 'Ban Expired',
    sort: false,
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: true,
    label: 'Action',
    sort: false,
    align: 'center',
  },
]
const UserList: VFC<{}> = () => {
  useTitle('User Dashboard')
  const classes = useStyles()
  const history = useHistory()
  const { search } = useLocation()
  const dispatch = useAppDispatch()
  const [users, setUsers] = useState({ users: [{} as User], total: 0 })
  const [value, setValue] = useState(initialValue)
  const [tableProps, setTableProps] = useState<TableProps<User>>({
    order: 'asc',
    orderBy: 'firstName',
    page: 0,
    rowsPerPage: 10,
  })

  const getUsers = async (query: string) => {
    try {
      const response = await axios.get(`/users/all?${query}`)
      setUsers(response.data)
    } catch (error) {
      dispatch(
        setMessage({ content: error.response.data.message, type: 'error' })
      )
    }
  }

  const handleUnban = async (userId: string) => {
    try {
      await axios.get(`/admin/unban_user/${userId}`)
	  getUsers(search)
    } catch (error) {
      dispatch(
        setMessage({ content: error.response.data.message, type: 'error' })
      )
    }
  }

  //   Retrieve query from URL
  useEffect(() => {
    const { firstName, lastName, email, sort, page, rowsPerPage } =
      queryString.parse(search)
    if (sort) {
      const [orderBy, order] = (sort as string).split('-')
      setTableProps((state) => ({
        order: order ? (order as Order) : state.order,
        orderBy: orderBy ? (orderBy as keyof User) : state.orderBy,
        page: page ? Number(page) - 1 : state.page,
        rowsPerPage: rowsPerPage ? Number(rowsPerPage) : state.rowsPerPage,
      }))
    }
    setValue({
      firstName: (firstName as string) || '',
      lastName: (lastName as string) || '',
      email: (email as string) || '',
    })
    setTableProps((state) => ({
      ...state,
      page: page ? Number(page) - 1 : state.page,
      rowsPerPage: rowsPerPage ? Number(rowsPerPage) : state.rowsPerPage,
    }))
    getUsers(search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //   Update URL
  useEffect(() => {
    const { firstName, lastname, email } = queryString.parse(search)
    const { order, orderBy, page, rowsPerPage } = tableProps
    const values = {
      firstName,
      lastname,
      email,
      sort: `${orderBy}-${order}`,
      page: page + 1,
      rowsPerPage,
    }
    const query = queryString.stringify(values)
    history.push(`?${query}`)
    getUsers(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableProps])

  const handleSubmit = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
    const { order, orderBy, rowsPerPage } = tableProps
    const newValues = {
      ...values,
      sort: `${orderBy}-${order}`,
      page: 1,
      rowsPerPage,
    }
    const query = queryString.stringify(newValues)
    getUsers(query)
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
              <Field
                name="firstName"
                type="text"
                label="First Name"
                color="secondary"
                fullWidth
                as={TextField}
                className={classes.field}
              />
              <Field
                name="lastName"
                type="text"
                label="Last Name"
                color="secondary"
                fullWidth
                as={TextField}
                className={classes.field}
              />
              <Field
                name="email"
                type="text"
                label="Email"
                color="secondary"
                fullWidth
                as={TextField}
                className={classes.field}
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
      <UserTable
        users={users.users}
        tableProps={tableProps}
        setTableProps={setTableProps}
        headCells={headCells}
        total={users.total}
        getUsers={getUsers}
        handleUnban={handleUnban}
      />
    </div>
  )
}

export default UserList
