//#region Imports
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './_login.scss'
import { AVInput, AVButton, AVLink } from '~/components/controls'
import { CommonOrnament1, LightBrandLogo } from '~/static/img'
import { IAppState } from '~/core/redux'
import { IAuthState, AuthActions } from '~/core/redux/auth'
//#endregion


export const LoginPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const authRoot = useSelector<IAppState, IAuthState>(state => state.auth)

  const [emailInput, setEmailInput] = useState('')
  const [emailInputError, setemailInputError] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordInputError, setPasswordInputError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(authRoot.meta.server_status === 'loading')

    if (authRoot.credentials.is_logged_in === true)
      history.replace('/vendors/')

    if (authRoot.meta.server_message === 'NOT_ADMIN')
      setemailInputError('Administrator ONLY.')
      
  }, [authRoot])

  const _onLoginClick = e => {
    if (emailInput && passwordInput)
      dispatch(AuthActions.loginUser_request({email: emailInput, password: passwordInput}))

    if (!emailInput)
      setemailInputError('Please input your user email!')

    if (!passwordInput)
      setPasswordInputError('Password must not be empty.')
  }

  return (
    <div class='login-page' data-theme="light">

      <AVLink link="/">
        <img class="brand-logo" src={LightBrandLogo} alt="Brand" />
      </AVLink>

      <div class="panel-main">
        <div class="section main">
          <div class="tx panel-title">Login</div>
          <div class="tx panel-subtitle">Selamat datang admin.</div>

          <div class="enclosure-input">
            <AVInput 
              id="email" 
              type="email" 
              onChange={e => setEmailInput(e.target.value)}
              errorLabel={emailInputError}
              inputPlaceholder="Email address (Admin only)" />
          </div>
          <div class="enclosure-input">
            <AVInput 
              id="password" 
              type="password"
              errorLabel={passwordInputError}
              onChange={e => setPasswordInput(e.target.value)}
              inputPlaceholder="Password" />
          </div>

          <div class="enclosure-action">
            <AVButton 
              size="large" 
              loadingMode={isLoading}
              onClick={_onLoginClick}>
              LOGIN
          </AVButton>
          </div>

          {/* <div class="enclosure-action">
          <div class="tx par">
            Belum punya akun? <AVLink link="/auth/register" color="primary">Daftar</AVLink>
          </div>
        </div> */}

        </div>
        <div class="section ornament">
          <img src={CommonOrnament1} alt="Ornament" />
        </div>
      </div>
    </div>
  )
}