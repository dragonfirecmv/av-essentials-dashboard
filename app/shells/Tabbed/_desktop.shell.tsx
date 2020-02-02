// #region Imports, Interfaces
import { h } from 'preact'
import { useLocation, useHistory } from 'react-router'
import { DrawerMainView } from '~/components/views/drawer'

import './_desktop.scss'

interface IProps {
  children?: any
}
// #endregion


export const TabbedShellDesktop = (props: IProps) => {


  return (
    <div class="shell-tabbed-desktop">
      <div class="area-content">
        {props.children}
      </div>
      <div className="area-drawer">
        <DrawerMainView/>
      </div>
    </div>
  )
}