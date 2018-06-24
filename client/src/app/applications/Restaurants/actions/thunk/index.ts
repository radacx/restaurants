import { Dispatch } from "../../../../../_types/Dispatch";
import {
  freeTablesLoaded,
  reservationCreated,
  restaurantsLoaded,
} from "../actionCreators";
import { backend } from "../../../../../_misc/backend";
import { IFreeTablesRequest } from "../../../../../_types/IFreeTablesRequest";
import { INewReservation } from "../../../../../_types/INewReservation";

export const fetchRestaurants = () =>
  async (dispatch: Dispatch): Promise<void> => {
    const restaurants = await backend.getRestaurants();

    dispatch(restaurantsLoaded(restaurants));
  };

export const loadFreeTables = (restaurantId: number, freeTablesRequest: IFreeTablesRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    const tables = await backend.loadTables(restaurantId, freeTablesRequest);

    dispatch(freeTablesLoaded(tables));
  };

export const createReservation = (restaurantId: number, reservation: INewReservation) =>
  async (dispatch: Dispatch): Promise<void> => {
    await backend.createReservation(restaurantId, reservation);

    dispatch(reservationCreated(reservation));
  };