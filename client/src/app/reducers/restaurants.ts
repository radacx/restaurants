import { IRestaurant } from "../../_types/IRestaurant";
import { RESTAURANTS_LOADED } from "../actions/actionTypes";
import { IAction } from "../../_types/IAction";

type State = IRestaurant[];

const initialState: State = [];

export const restaurants = (state = initialState, action: IAction): State => {
  switch (action.type) {
    case RESTAURANTS_LOADED:
      return action.payload.restaurants;
    default:
      return state;
  }
};
