import { IReservation } from "../../../../../_types/IReservation";
import { IAction } from "../../../../../_types/IAction";
import {
  RESERVATION_REMOVED,
  RESERVATIONS_LOADED
} from "../../actions/actionTypes";

type State = {
  [index: string]: IReservation,
};
const initialState: State = {};

export const reservations = (state = initialState, { type, payload }: IAction) => {
  switch (type) {
    case RESERVATIONS_LOADED:
      return payload.reservations.reduce((reservationsObject: State, reservation: IReservation) => {
        reservationsObject[reservation.id] = reservation;
        return reservationsObject;
      }, {} as State);
    case RESERVATION_REMOVED:
      const tempState = { ...state };
      delete tempState[payload.id];
      return tempState;
    default:
      return state;
  }
};