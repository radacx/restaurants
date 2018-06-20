import { IRestaurant } from "../../_types/IRestaurant";
import {
  FREE_TABLES_LOADED,
  RESTAURANTS_LOADED,
} from './actionTypes';
import { ITable } from "../../_types/ITable";

export const restaurantsLoaded = (restaurants: IRestaurant[]) => ({
  type: RESTAURANTS_LOADED,
  payload: { restaurants },
});

export const freeTablesLoaded = (freeTables: ITable[]) => ({
  type: FREE_TABLES_LOADED,
  payload: { freeTables },
});
