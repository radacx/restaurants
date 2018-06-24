import { ITable } from "../../../../../_types/ITable";
import {
  FREE_TABLES_LOADED,
  RESERVATION_CREATED,
  RESTAURANTS_LOADED
} from "../../actions/actionTypes";
import { IAction } from "../../../../../_types/IAction";
import { INewReservation } from "../../../../../_types/INewReservation";

type State = {
  [index: number]: ITable;
};

const initialState: State = {};

export const freeTables = (state = initialState, { type, payload }: IAction): State => {
  switch (type) {
    case FREE_TABLES_LOADED:
      return payload.freeTables.reduce((freeTablesObject: { [index: number]: ITable }, t: ITable) => {
        freeTablesObject[t.id] = t;
        return freeTablesObject;
      }, {});
    case RESERVATION_CREATED:
      const reservation = payload.reservation as INewReservation;

      const tempFreeTables = { ...state };
      const table = tempFreeTables[reservation.tableId];

      const newTimeBlocks = table.freeTimeBlocks.filter(tB => tB !== reservation.block);

      if (newTimeBlocks.length === 0) {
        delete tempFreeTables[reservation.tableId];
      } else {
        tempFreeTables[reservation.tableId] = {
          ...table,
          freeTimeBlocks: newTimeBlocks,
        };
      }

      return tempFreeTables;
    case RESTAURANTS_LOADED:
      return initialState;
    default:
      return state;
  }
};
