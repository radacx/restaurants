import * as React from "react";
import { connect } from "react-redux";
import {
  IRestaurantAppCallbackProps,
  RestaurantApp as RestaurantAppComponent
} from "../components/RestaurantApp";
import { Dispatch } from "../../_types/Dispatch";
import { fetchRestaurants } from "../actions/thunk";

const mapDispatchToProps = (dispatch: Dispatch): IRestaurantAppCallbackProps => ({
  fetchRestaurants: () => dispatch(fetchRestaurants()),
});

export const RestaurantApp: React.ComponentClass = connect(
  undefined,
  mapDispatchToProps,
)(RestaurantAppComponent);