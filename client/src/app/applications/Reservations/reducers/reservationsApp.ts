import { combineReducers } from "redux";
import { IReservationsAppStore } from "../store/IReservationsAppStore";
import { reservations } from "./internalReducers/reservations";

export const reservationsApp = combineReducers<IReservationsAppStore>({
  reservations,
});
