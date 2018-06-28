import { IRestaurant } from "../../../../_types/IRestaurant";
import { ITable } from "../../../../_types/ITable";

export interface IRestaurantsAppStore {
  restaurants: IRestaurant[];
  freeTables: {
    [index: string]: ITable;
  };
}
