import * as React from "react";
import { IRestaurant } from "../../_types/IRestaurant";

interface IRestaurantOwnProps {
  readonly restaurant: IRestaurant;
}

export const Restaurant: React.StatelessComponent<IRestaurantOwnProps> = ({ restaurant }) => (
  <div>
    {restaurant.name}
  </div>
);
