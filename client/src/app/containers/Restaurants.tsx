import * as React from "react";
import { connect } from "react-redux";
import { IStore } from "../../store/IStore";
import {
  IRestaurantsDataProps,
  Restaurants as RestaurantsComponent
} from "../components/Restaurants";

const mapStateToProps = ({ restaurants }: IStore): IRestaurantsDataProps => ({
  restaurants,
});

export const Restaurants: React.ComponentClass = connect(
  mapStateToProps,
)(RestaurantsComponent);
