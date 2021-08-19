import React from 'react'
import {
  makeStyles,
  Theme,
  Paper,
  Divider
} from '@material-ui/core'
import UserProfileForm from './UserProfileForm'
import UserPasswordForm from './UserPasswordForm'
import useTitle from '../../custom-hooks/useTitle'

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
  divider:{
	  height: 3,
	  marginTop: theme.spacing(2), 
	  marginBottom: theme.spacing(2) 
  }
}))


function UserForm() {
  const classes = useStyles()
  useTitle('Update profile')
  return (
    <>
      <Paper elevation={1} className={classes.paper}>
		  <UserProfileForm/>
		  <Divider className={classes.divider}/>
		  <UserPasswordForm/>
      </Paper>
    </>
  )
}

export default UserForm
