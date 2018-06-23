import { Dispatch } from "../../../../../_types/Dispatch";
import {
  freeTablesLoaded,
  restaurantsLoaded,
} from "../actionCreators";
import { fakeBackend } from "../../../../../fakeBackend";
import { IFreeTablesRequest } from "../../../../../_types/IFreeTablesRequest";

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
