import { IRestaurant } from "./IRestaurant";

export interface IReservation {
  id: string;
  restaurant: IRestaurant;
  day: string;
  block: number;
  forName: string;
}
