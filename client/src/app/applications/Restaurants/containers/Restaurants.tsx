import * as React from "react";
import { connect } from "react-redux";
import { IStore } from "../../../../store/IStore";
import {
  IRestaurantsCallbackProps,
  IRestaurantsDataProps,
  Restaurants as RestaurantsComponent
} from "../components/Restaurants";
import { Dispatch } from "../../../../_types/Dispatch";
import {
  createReservation,
  loadFreeTables
} from "../actions/thunk";
import { IFreeTablesRequest } from "../../../../_types/IFreeTablesRequest";
import { withRouter } from "react-router";
import { INewReservation } from "../../../../_types/INewReservation";

const mapStateToProps = ({ restaurantsApp: { restaurants } }: IStore): IRestaurantsDataProps => ({
  restaurants,
});

const mapDispatchToProps = (dispatch: Dispatch): IRestaurantsCallbackProps => ({
  getFreeTables: (restaurantId: string, freeTablesRequest: IFreeTablesRequest) => dispatch(loadFreeTables(restaurantId, freeTablesRequest)),
  createReservation: (restaurantId: string, reservation: INewReservation) => dispatch(createReservation(restaurantId, reservation)),
});

const RestaurantsWithRouter = withRouter(RestaurantsComponent);

export const Restaurants: React.ComponentClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantsWithRouter);
