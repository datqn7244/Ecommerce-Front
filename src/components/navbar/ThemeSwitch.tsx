import React, { useContext } from 'react'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'

import { CustomThemeContext } from '../../themes/CustomThemeProvider'
import FunctionalIcon from '../utils/FunctionalIcon'

type Classes = {
	classes: string
}

const ThemeSwitch: React.VFC<Classes> = ({classes}) => {
  const { currentTheme, setTheme } = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')

  return (
    <FunctionalIcon
      classes={classes}
      state={isDark}
      title1="Light Mode"
      title2="Dark Mode"
      label="Toggle Light/Dark Mode"
      toggle={() => (isDark ? setTheme('light') : setTheme('dark'))}
      icon1={<Brightness7Icon />}
      icon2={<Brightness4Icon />}
    />
  )
}

export default ThemeSwitch
