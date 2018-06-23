import * as React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store/configureStore";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import { HashRouter } from 'react-router-dom';
import { Applications } from "./applications/Applications";

const store = configureStore();

export const MainApp: React.StatelessComponent = () =>
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <HashRouter>
        <Applications />
      </HashRouter>
    </MuiPickersUtilsProvider>
  </Provider>;
