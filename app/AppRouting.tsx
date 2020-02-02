//#region Imports
import { h, Fragment as F } from 'preact'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { RouteTabbedShell } from './shells/Tabbed'
import { 
  LoginPage, 
  RegisterPage, 
  VendorsPage, 
  AccountsPage, 
  SellablesPage, 
  VendorEditorPage, 
  GoodsEditorPage,
  PackageEditorPage
} from '~/components/pages'
//#endregion


export default () => (
  <Router>
    <RouteTabbedShell exact path="/"                        loginOnly component={LoginPage} />
    <RouteTabbedShell exact path="/vendors"                 loginOnly component={VendorsPage} />
    <RouteTabbedShell exact path="/vendors/edit"            loginOnly component={VendorEditorPage} />
    <RouteTabbedShell exact path="/sellables"               loginOnly component={SellablesPage} />
    <RouteTabbedShell exact path="/sellables/edit-packages" loginOnly component={PackageEditorPage} />
    <RouteTabbedShell exact path="/sellables/edit-goods"    loginOnly component={GoodsEditorPage} />
    <RouteTabbedShell exact path="/accounts"                loginOnly component={AccountsPage} />
    {/* <RouteTabbedShell exact path="/transactions"  component={VendorsPage} /> */}
    
    <Route            exact path="/auth/login"            component={LoginPage} />
    <Route            exact path="/auth/register"         component={RegisterPage} />

  </Router>
)