import { ITable } from "../../_types/ITable";
import { FREE_TABLES_LOADED } from "../actions/actionTypes";
import { IAction } from "../../_types/IAction";

type State = ITable[];

const initialState: State = [];

export const restaurantTables = (state = initialState, action: IAction): State => {
  switch (action.type) {
    case FREE_TABLES_LOADED:
      return action.payload.freeTables;
    default:
      return state;
  }
};
