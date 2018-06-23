import { IRestaurantsAppStore } from "../app/applications/Restaurants/store/IRestaurantsAppStore";
import { IReservationsAppStore } from "../app/applications/Reservations/store/IReservationsAppStore";

export interface IStore {
  restaurantsApp: IRestaurantsAppStore,
  reservationsApp: IReservationsAppStore,
}
