import { combineReducers } from "redux";
import { IStore } from "./IStore";
import { restaurants } from "../app/reducers/restaurants";
import { restaurantTables } from "../app/reducers/restaurantTables";

export const reducer = combineReducers<IStore>({
  restaurants,
  restaurantTables,
});