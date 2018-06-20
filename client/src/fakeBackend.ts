import { IRestaurant } from "./_types/IRestaurant";
import { HttpClient } from "./_misc/HttpClient";
import {
  RESTAURANTS,
  RESTAURANTS_FREE_TABLES
} from "./_misc/api";
import { ITable } from "./_types/ITable";
import { INewReservation } from "./_types/INewReservation";
import { IFreeTablesRequest } from "./_types/IFreeTablesRequest";

export const realBackend = {
  getRestaurants(): Promise<IRestaurant[]> {
    return HttpClient.get<IRestaurant[]>(RESTAURANTS);
  },
  loadFreeTables(restaurantId: number, freeTablesRequest: IFreeTablesRequest): Promise<ITable[]> {
    return HttpClient.get<ITable[]>(RESTAURANTS_FREE_TABLES);
  },
  createReservation(restaurantId: number, reservation: INewReservation) {
    return HttpClient.post(`${RESTAURANTS}/${restaurantId}`, reservation);
  },
};

type Backend = typeof realBackend;

const restaurants: IRestaurant[] = [
  { id: 1, name: "res1" },
  { id: 12, name: "res2" },
  { id: 14, name: "res3" },
  { id: 123, name: "RESTAURACIA " },
];
const freeTables: ITable[] = [];

export const fakeBackend: Backend = {
  getRestaurants: () => Promise.resolve(restaurants),
  loadFreeTables: () => Promise.resolve(freeTables),
  createReservation: (_number, _reservation) => Promise.resolve(),
};