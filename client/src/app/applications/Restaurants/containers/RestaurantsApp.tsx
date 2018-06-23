import * as React from "react";
import { connect } from "react-redux";
import {
  IRestaurantsAppCallbackProps,
  RestaurantsApp as RestaurantsAppComponent
} from "../components/RestaurantsApp";
import { Dispatch } from "../../../../_types/Dispatch";
import { fetchRestaurants } from "../actions/thunk";

const mapDispatchToProps = (dispatch: Dispatch): IRestaurantsAppCallbackProps => ({
  fetchRestaurants: () => dispatch(fetchRestaurants()),
});

export const RestaurantsApp: React.ComponentClass = connect(
  undefined,
  mapDispatchToProps,
)(RestaurantsAppComponent);