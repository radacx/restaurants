import { Dispatch } from "../../../../../_types/Dispatch";
import {
  freeTablesLoaded,
  reservationCreated,
  restaurantsLoaded,
} from "../actionCreators";
import { fakeBackend } from "../../../../../fakeBackend";
import { IFreeTablesRequest } from "../../../../../_types/IFreeTablesRequest";
import { INewReservation } from "../../../../../_types/INewReservation";

export const fetchRestaurants = () =>
  async (dispatch: Dispatch): Promise<void> => {
    const restaurants = await fakeBackend.getRestaurants();

    dispatch(restaurantsLoaded(restaurants));
  };

export const loadFreeTables = (restaurantId: number, freeTablesRequest: IFreeTablesRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    const tables = await fakeBackend.loadTables(restaurantId, freeTablesRequest);

    dispatch(freeTablesLoaded(tables));
  };

export const createReservation = (restaurantId: number, reservation: INewReservation) =>
  async (dispatch: Dispatch): Promise<void> => {
    await fakeBackend.createReservation(restaurantId, reservation);

    dispatch(reservationCreated(reservation));
  };