import * as React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store/configureStore";
import { RestaurantApp } from "./containers/RestaurantApp";

const store = configureStore();

export const Main: React.StatelessComponent = () =>
  <Provider store={store}>
    <RestaurantApp />
  </Provider>;
