import React, { useEffect } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import {
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  Button,
  TextField,
} from '@material-ui/core'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import queryString from 'query-string'

import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxHook'
import {
  getCategories,
  getProducts,
  setCategoriesDrawer,
} from '../../redux/action'
import { drawerWidth } from '../../App'
import { Field, Form, Formik, FormikHelpers } from 'formik'

const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    height: `calc(100% - ${theme.spacing(8)}px)`,
    marginTop: theme.spacing(8),
  },
  drawerPaper: {
    width: drawerWidth,
    height: `calc(100% - ${theme.spacing(8)}px)`,
    marginTop: theme.spacing(8),
  },
  toolbar: theme.mixins.toolbar,
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

const initialValue = { name: '' }
const CategoriesBar: React.VFC<{
  window?: () => Window
  sort?: string
  page?: number
}> = ({ window, sort, page }) => {
  const theme = useTheme()
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { categoriesDrawer } = useAppSelector((state) => state.utilsReducer)
  const { categories } = useAppSelector((state) => state.productReducer)
  const { search } = useLocation()

  const category = (useParams() as Record<string, string>).categoryName
  const topCategories = ['Homepage', 'New', 'Hot']

  const handleDrawerToggle = () => {
    dispatch(setCategoriesDrawer(!categoriesDrawer))
  }
  useEffect(() => {
    dispatch(getCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { name } = queryString.parse(search)
    const newValues = {
      name,
      category,
      sort: sort ? sort : undefined,
	  page,
	  rowsPerPage:12
    }
    const query = queryString.stringify(newValues)
    dispatch(getProducts(query))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, page])

  const container =
    window !== undefined ? () => window().document.body : undefined

  const handleSubmit = async (
    values: typeof initialValue,
    action: FormikHelpers<typeof initialValue>
  ) => {
    const newValues = {
      ...values,
      sort: sort ? sort : undefined,
    }
    const query = queryString.stringify(newValues)
    dispatch(getProducts(query))
    history.push(`/search?${queryString.stringify(newValues)}`)
    setTimeout(() => {
      action.setSubmitting(false)
    })
  }

  const drawer = (
    <>
      <List>
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => {
            return (
              <Form className={classes.form}>
                <Field
                  name="name"
                  type="text"
                  label="Search"
                  color="secondary"
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
        <Divider />
        {topCategories.map((text, index) => (
          <MuiLink
            color="inherit"
            to={`/category/${text}`}
            component={Link}
            key={text}
          >
            <ListItem button>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </MuiLink>
        ))}
      </List>
      <Divider />
      <List>
        {categories.map((category, index) => {
          if (!topCategories.includes(category.name)) {
            return (
              <MuiLink
                color="inherit"
                to={`/category/${category.name}`}
                component={Link}
                key={category.name}
              >
                <ListItem button>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={category.name} />
                </ListItem>
              </MuiLink>
            )
          }
          return null
        })}
      </List>
    </>
  )
  return (
    <nav className={classes.drawer} aria-label="Categories Menu">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={categoriesDrawer}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        ></Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default CategoriesBar
