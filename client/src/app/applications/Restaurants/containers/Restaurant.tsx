import * as React from "react";
import { connect } from "react-redux";
import {
  Restaurant as RestaurantComponent,
  IRestaurantDataProps,
  IRestaurantOwnProps
} from "../components/Restaurant";
import { IStore } from "../../../../store/IStore";

const mapStateToProps = ({ restaurantsApp: { freeTables } }: IStore): IRestaurantDataProps => ({
  freeTables: Object.keys(freeTables).map(key => freeTables[key]),
});

export const Restaurant: React.ComponentClass<IRestaurantOwnProps> = connect(
  mapStateToProps,
)(RestaurantComponent);