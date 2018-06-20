import { IRestaurant } from "../_types/IRestaurant";
import { ITable } from "../_types/ITable";

export interface IStore {
  restaurants: IRestaurant[];
  restaurantTables: ITable[];
}
