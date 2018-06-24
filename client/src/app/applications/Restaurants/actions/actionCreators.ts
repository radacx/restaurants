import { IRestaurant } from "../../../../_types/IRestaurant";
import {
  FREE_TABLES_LOADED,
  RESERVATION_CREATED,
  RESTAURANTS_LOADED,
} from './actionTypes';
import { ITable } from "../../../../_types/ITable";
import { INewReservation } from "../../../../_types/INewReservation";

export const restaurantsLoaded = (restaurants: IRestaurant[]) => ({
  type: RESTAURANTS_LOADED,
  payload: { restaurants },
});

export const freeTablesLoaded = (freeTables: ITable[]) => ({
  type: FREE_TABLES_LOADED,
  payload: { freeTables },
});

export const reservationCreated = (reservation: INewReservation) => ({
  type: RESERVATION_CREATED,
  payload: { reservation },
});
