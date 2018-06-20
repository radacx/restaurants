import { Dispatch } from "../../../_types/Dispatch";
import {
  freeTablesLoaded,
  restaurantsLoaded,
} from "../actionCreators";
import { INewReservation } from "../../../_types/INewReservation";
import { fakeBackend } from "../../../fakeBackend";
import { IFreeTablesRequest } from "../../../_types/IFreeTablesRequest";

export const fetchRestaurants = () =>
  async (dispatch: Dispatch): Promise<void> => {
    const restaurants = await fakeBackend.getRestaurants();

    dispatch(restaurantsLoaded(restaurants));
  };

export const loadFreeTables = (restaurantId: number, freeTablesRequest: IFreeTablesRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    const freeTables = await fakeBackend.loadFreeTables(restaurantId, freeTablesRequest);

    dispatch(freeTablesLoaded(freeTables));
  };

export const createReservation = async (restaurantId: number, reservation: INewReservation): Promise<void> =>
  await fakeBackend.createReservation(restaurantId, reservation);
