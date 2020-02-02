// #region Imports
import { h } from 'preact'
import { useLocation, useHistory } from 'react-router'
import './_drawerMain.scss'

import {
  IconDashboard,
  IconVendor,
  IconSellable,
  IconAccounts
} from '~/components/gylph'
// #endregion


export const DrawerMainView = () => {

  const history = useHistory()
  const locations = history.location.pathname.split('/')

  const TabButton = ({ name, children }) => (
    <div
      class={`drawer-tab-btn ${locations[1].toLowerCase() === name.toLowerCase() && 'active' || ''}`}
      onClick={() => history.push(`/${name.toLowerCase()}`)}>
      <div class="drawer-tab-content">
        {children}
      </div>
    </div>
  )


  return (
    <div class="view-drawer-main" data-theme="light">
      <div class="enclosure-drawer-tabs">
        {/* <TabButton name="">
          <IconDashboard id="tab-dashboard-ico" />
        </TabButton> */}
        <TabButton name="Vendors">
          <IconVendor id="tab-vendor-ico" />
        </TabButton>
        <TabButton name="Sellables">
          <IconSellable id="tab-sellable-ico" />
        </TabButton>
        {/* <TabButton name="Accounts">
          <IconAccounts id="tab-accounts-ico" />
        </TabButton> */}
      </div>
    </div>
  )
}