import { ITable } from "../../../../../_types/ITable";
import {
  FREE_TABLES_LOADED,
  RESTAURANTS_LOADED
} from "../../actions/actionTypes";
import { IAction } from "../../../../../_types/IAction";

type State = ITable[];

const initialState: State = [];

export const freeTables = (state = initialState, { type, payload }: IAction): State => {
  switch (type) {
    case FREE_TABLES_LOADED:
      return payload.freeTables;
    case RESTAURANTS_LOADED:
      return [];
    default:
      return state;
  }
};
