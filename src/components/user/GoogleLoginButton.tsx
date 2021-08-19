import { useContext } from 'react'
import GoogleLogin from 'react-google-login'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { CustomThemeContext } from '../../themes/CustomThemeProvider'
import { useAppDispatch } from '../../custom-hooks/reduxHook'
import { signinWithGoogle } from '../../redux/action'

type GoogleLoginButtonProps = {
  text: string
}
const useStyle = makeStyles((theme: Theme) => ({
  googleButton: {
    margin: 'auto',
    padding: 'auto 100px',
  },
}))
const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ text }) => {
  const { currentTheme } = useContext(CustomThemeContext)
  const classes = useStyle()
  const dispatch = useAppDispatch()
  const handleGoogleResponse = (response: any) => {
	dispatch(signinWithGoogle(response.tokenId))
  }

  return (
    <GoogleLogin
      clientId="180705516228-d1j1bbknlk992q5je8da66dbq7lm6cma.apps.googleusercontent.com"
      buttonText={text}
      onSuccess={handleGoogleResponse}
      onFailure={handleGoogleResponse}
      cookiePolicy={'single_host_origin'}
      theme={currentTheme}
      className={classes.googleButton}
    />
  )
}

export default GoogleLoginButton
