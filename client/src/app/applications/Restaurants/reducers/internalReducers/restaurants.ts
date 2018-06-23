import { IRestaurant } from "../../../../../_types/IRestaurant";
import { RESTAURANTS_LOADED } from "../../actions/actionTypes";
import { IAction } from "../../../../../_types/IAction";

type State = IRestaurant[];

const initialState: State = [];

export const restaurants = (state = initialState, { type, payload }: IAction): State => {
  switch (type) {
    case RESTAURANTS_LOADED:
      return payload.restaurants;
    default:
      return state;
  }
};
