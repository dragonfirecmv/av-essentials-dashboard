//#region Imports
import { h, Fragment as F } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useSelector } from 'react-redux'
import { Route, RouteProps } from 'react-router-dom'
import { TabbedShellDesktop } from './_desktop.shell'
import { TabbedShellMobile } from './_mobile.shell'
import { IAppState } from '~/core/redux'
import { IAuthState } from '~/core/redux/auth'
//#endregion


export const RouteTabbedShell = ({ component: Child, loginOnly, ...rest }: IShellProps) => {

  const authState = useSelector<IAppState, IAuthState>(state => state.auth)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // if (loginOnly && !authState.credentials.is_logged_in)
    //   window.location.href = '/auth/login'

    const mql = window.matchMedia('(max-width: 767px), (max-height: 767px)')
    console.log(mql.matches)

    const onInadequateWidth = () => {
      if (mql.matches) setIsMobile(true)
      else setIsMobile(false)
    }

    mql.addListener(onInadequateWidth)

    return () => {
      mql.removeListener(onInadequateWidth)
    }

  }, [])

  return (
    <Route
      {...rest}
      render={routeProps => (
        <F>
          <div style={{ display: isMobile ? 'none' : '', width: '100%', height: '100%'}}>
            <TabbedShellDesktop>
              <Child {...routeProps} />
            </TabbedShellDesktop>
          </div>
          <div style={{ display: !isMobile ? 'none' : '' , width: '100%', height: '100%' }}>
            <TabbedShellMobile />
          </div>
        </F>
      )} />
  )
}

interface IShellProps extends RouteProps {
  loginOnly?: boolean
}