import { h } from 'preact'
import './_mobile.scss'


export const TabbedShellMobile = () => {

  return (
    <div class="shell-tabbed-mobile">
      <div class="tx info-text">
        Sorry, but this web app currently only supports device with screen resolution of 768px (width and height) and up.
      </div>
      <div class="tx info-ua">
        {navigator.userAgent}
      </div>
    </div>
  )
}