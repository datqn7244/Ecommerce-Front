import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute: React.FC<{
  component: React.FC
  path: string
  exact: boolean
  condition: boolean,
  redirect:string
}> = ({ component, path, exact, condition, redirect }) => {
  return condition ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={redirect} />
  )
}
export default PrivateRoute
