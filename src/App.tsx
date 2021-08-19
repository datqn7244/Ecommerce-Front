import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

import { useAppDispatch, useAppSelector } from './custom-hooks/reduxHook'
import { clearToken, setMessage } from './redux/action'
import PrivateRoute from './components/utils/PrivateRoute'
import NavBar from './components/NavBar'
import SigninForm from './components/user/SigninForm'
import SignupForm from './components/user/SignupForm'
import UserForm from './components/user/UserForm'
import { useSnackbar } from 'notistack'
import ProductList from './components/admin/productDashboard/ProductList'
import UserList from './components/admin/userDashboard/UserList'
import ProductGrid from './components/product/ProductGrid'
import ProductPage from './components/product/ProductPage'

export const drawerWidth = 240

function App() {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { user, token } = useAppSelector((state) => state.userReducer)
  const { message } = useAppSelector((state) => state.utilsReducer)
  if (message.content) {
    enqueueSnackbar(message.content, {
      preventDuplicate: true,
      variant: message.type,
    })
    dispatch(setMessage({ content: '', type: 'default' }))
  }
  return (
    <>
      <Router>
        <NavBar token={token} user={user} />
        <Switch>
          <Route exact path="/" component={ProductGrid} />
          <Route exact path="/search" component={ProductGrid} />
          <Route
            exact
            path="/category/:categoryName"
            component={ProductGrid}
          />
          <Route
            exact
            path="/product/:productName/:productId"
            component={ProductPage}
          />
          <PrivateRoute
            exact
            path="/signin"
            component={SigninForm}
            condition={!token}
            redirect="/"
          />
          <PrivateRoute
            exact
            path="/signup"
            component={SignupForm}
            condition={!token}
            redirect="/"
          />
          <Route
            exact
            path="/signout"
            component={() => {
              setTimeout(() => {
                dispatch(clearToken())
              }, 0)
              return <Redirect to="/signin" />
            }}
          />
          <PrivateRoute
            exact
            path="/user/setting"
            component={UserForm}
            condition={Boolean(token)}
            redirect="/signin"
          />
          <PrivateRoute
            exact
            path="/admin/products"
            component={ProductList}
            condition={user.role === 'Admin'}
            redirect="/"
          />
          <PrivateRoute
            exact
            path="/admin/users"
            component={UserList}
            condition={user.role === 'Admin'}
            redirect="/"
          />
        </Switch>
      </Router>
    </>
  )
}

export default App
