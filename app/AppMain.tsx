import { h, Fragment as F } from 'preact'
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import '~/core/init/init-i18n'
import '~/core/init/init-numeral'

import { globalStore } from '~/core/init/init-globalstore';
import AppComposition from './AppComposition';
import AppRouting from './AppRouting';


export default () => (
  <F>
    <Provider store={globalStore}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AppComposition>
          <AppRouting />
        </AppComposition>
      </MuiPickersUtilsProvider>
    </Provider>
  </F>
)