import { combineReducers } from "redux";
import { restaurants } from "./internalReducers/restaurants";
import { freeTables } from "./internalReducers/freeTables";
import { IRestaurantsAppStore } from "../store/IRestaurantsAppStore";

export const restaurantsApp = combineReducers<IRestaurantsAppStore>({
  restaurants,
  freeTables,
});
