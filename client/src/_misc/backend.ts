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

export const realBackend = {
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

type Backend = typeof realBackend;

const restaurants: IRestaurant[] = [
  { id: 1, name: "res1" },
  { id: 12, name: "res2" },
  { id: 14, name: "res3" },
  { id: 123, name: "RESTAURACIA " },
];
const tables: ITable[] = [
  { id: 1, seats: 3, number: 34, freeTimeBlocks: [ 2, 4, 5 ] },
  { id: 2, seats: 2, number: 36, freeTimeBlocks: [ 5, 6 ] },
];
let reservations: IReservation[] = [
  { id: 3, block: 5, day: new Date(), restaurant: { id: 1, name: 'Trolo' } }
];

export const fakeBackend: Backend = {
  getRestaurants: () => Promise.resolve(restaurants),
  getReservations: () => Promise.resolve(reservations),
  removeReservation: async (id: number) => {
    reservations = reservations.filter(r => r.id !== id);
  },
  loadTables: () => Promise.resolve(tables),
  createReservation: async (restaurantId: number, { block, day, tableId }: INewReservation) => {
    const newReservation: IReservation = {
      id: Math.random(),
      restaurant: restaurants.find(r => r.id === restaurantId)!,
      block,
      day,
    };

    reservations.push(newReservation);

    const table = tables.find(t => t.id === tableId);
    const newTimeBlocks = table!.freeTimeBlocks.filter(tB => tB !== block);

    if (newTimeBlocks.length === 0) {
      delete tables[tableId];
    } else {
      table!.freeTimeBlocks = newTimeBlocks;
    }
  },
};

export const backend = fakeBackend;
