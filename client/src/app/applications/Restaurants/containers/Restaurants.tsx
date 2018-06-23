import * as React from "react";
import { connect } from "react-redux";
import { IStore } from "../../../../store/IStore";
import {
  IRestaurantsCallbackProps,
  IRestaurantsDataProps,
  Restaurants as RestaurantsComponent
} from "../components/Restaurants";
import { Dispatch } from "../../../../_types/Dispatch";
import { loadFreeTables } from "../actions/thunk";
import { IFreeTablesRequest } from "../../../../_types/IFreeTablesRequest";
import { withRouter } from "react-router";

const mapStateToProps = ({ restaurantsApp: { restaurants } }: IStore): IRestaurantsDataProps => ({
  restaurants,
});

const mapDispatchToProps = (dispatch: Dispatch): IRestaurantsCallbackProps => ({
  getFreeTables: (restaurantId: number, freeTablesRequest: IFreeTablesRequest) => dispatch(loadFreeTables(restaurantId, freeTablesRequest)),
});

const RestaurantsWithRouter = withRouter(RestaurantsComponent);

export const Restaurants: React.ComponentClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RestaurantsWithRouter);
