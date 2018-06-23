import * as React from "react";
import {
  Redirect,
  Route,
  Switch
} from "react-router";
import { RestaurantsApp } from "./Restaurants/containers/RestaurantsApp";
import { ReservationsApp } from "./Reservations/containers/ReservationsApp";

export const Routes: React.StatelessComponent = () => (
  <Switch>
    <Route
      path="/"
      exact
      component={RestaurantsApp}
    />

    <Route
      path="/reservations"
      exact
      component={ReservationsApp}
    />

    <Route render={() => <Redirect to="/" />}/>
  </Switch>
);
