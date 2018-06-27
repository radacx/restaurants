import { IRestaurant } from "../_types/IRestaurant";
import { HttpClient } from "./HttpClient";
import {
  RESERVATIONS,
  RESERVATIONS_CREATE,
  RESERVATIONS_REMOVE,
  RESTAURANTS,
  RESTAURANTS_FREE_TABLES
} from "./api";
import { ITable } from "../_types/ITable";
import { INewReservation } from "../_types/INewReservation";
import { IFreeTablesRequest } from "../_types/IFreeTablesRequest";
import { IReservation } from "../_types/IReservation";

export const backend = {
  getRestaurants: (): Promise<IRestaurant[]> =>
    HttpClient.get<IRestaurant[]>(RESTAURANTS),
  getReservations: (): Promise<IReservation[]> =>
    HttpClient.get<IReservation[]>(RESERVATIONS),
  removeReservation: (id: number): Promise<any> =>
    HttpClient.delete(RESERVATIONS_REMOVE(id)),
  loadTables: (restaurantId: number, freeTablesRequest: IFreeTablesRequest): Promise<ITable[]> =>
    HttpClient.get<ITable[]>(RESTAURANTS_FREE_TABLES(restaurantId), freeTablesRequest),
  createReservation: (restaurantId: number, reservation: INewReservation): Promise<void> =>
    HttpClient.post(RESERVATIONS_CREATE(restaurantId), reservation),
};
