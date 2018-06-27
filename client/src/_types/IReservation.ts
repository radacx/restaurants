import { IRestaurant } from "./IRestaurant";

export interface IReservation {
  id: number;
  restaurant: IRestaurant;
  day: Date;
  block: number;
  forName: string;
}
