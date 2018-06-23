import { combineReducers } from "redux";
import { IStore } from "./IStore";
import { restaurantsApp } from "../app/applications/Restaurants/reducers/restaurantsApp";
import { reservationsApp } from "../app/applications/Reservations/reducers/reservationsApp";

export const reducer = combineReducers<IStore>({
  restaurantsApp,
  reservationsApp,
});
