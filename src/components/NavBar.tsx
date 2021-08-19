import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import ThemeSwitch from './navbar/ThemeSwitch'
import Title from './navbar/Title'
import CartButton from './navbar/CartButton'
import SideDrawer from './SideDrawer'
import { User } from '../types/reduxTypes'
import { useAppDispatch, useAppSelector } from '../custom-hooks/reduxHook'
import { setCategoriesDrawer } from '../redux/action'


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  cartButton: {},
  title: {
    flexGrow: 1,
  },
  anchor: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    margin: 'auto 4px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))

const NavBar: React.VFC<{ token: string; user: User; window?: () => Window }> =
  ({ token, user, window }) => {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const [drawer, setDrawer] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [adminAnchorEl, setAdminAnchorEl] = useState<null | HTMLElement>(null)
    const { categoriesDrawer } = useAppSelector((state) => state.utilsReducer)
	
    const handleDrawerToggle = () => {
	  dispatch(setCategoriesDrawer(!categoriesDrawer))
    }

    const toggleDrawer =
      (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return
        }
        setDrawer(open)
      }
    const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleAdminClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAdminAnchorEl(event.currentTarget)
    }

    const handleUserClose = () => {
      setAnchorEl(null)
    }

    const handleAdminClose = () => {
      setAdminAnchorEl(null)
    }

    return (
      <AppBar position="fixed">
        <SideDrawer
          drawer={drawer}
          toggleDrawer={toggleDrawer}
          anchor={'right'}
        />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Title classes={classes} />
          {user.firstName ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleUserClick}
              >
                Hi, {user.firstName}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleUserClose}
              >
                <Link to="/user/setting" className={classes.anchor}>
                  <MenuItem onClick={handleUserClose}>User Setting</MenuItem>
                </Link>
                <Link to="/signout" className={classes.anchor}>
                  <MenuItem onClick={handleUserClose}>Sign out</MenuItem>
                </Link>
              </Menu>
            </>
          ) : (
            <Link to="/signin" className={classes.anchor}>
              <Button className={classes.button}>Sign in</Button>
            </Link>
          )}
          {user.role === 'Admin' ? (
            <>
              <Button
                aria-controls="admin-dashboard"
                aria-haspopup="true"
                onClick={handleAdminClick}
              >
                Admin Dashboard
              </Button>
              <Menu
                id="admin-dashboard"
                anchorEl={adminAnchorEl}
                keepMounted
                open={Boolean(adminAnchorEl)}
                onClose={handleAdminClose}
              >
                <Link to="/admin/products" className={classes.anchor}>
                  <MenuItem onClick={handleAdminClose}>
                    Product dashboard
                  </MenuItem>
                </Link>
                <Link to="/admin/users" className={classes.anchor}>
                  <MenuItem onClick={handleAdminClose}>User dashboard</MenuItem>
                </Link>
              </Menu>
            </>
          ) : (
            <></>
          )}

          <ThemeSwitch classes={classes.button} />
          <CartButton toggleDrawer={toggleDrawer} classes={classes} />
        </Toolbar>
      </AppBar>
    )
  }

export default NavBar
