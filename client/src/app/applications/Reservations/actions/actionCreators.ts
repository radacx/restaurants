import {
  RESERVATION_REMOVED,
  RESERVATIONS_LOADED
} from './actionTypes';
import { IReservation } from "../../../../_types/IReservation";

export const reservationsLoaded = (reservations: IReservation[]) => ({
  type: RESERVATIONS_LOADED,
  payload: { reservations },
});

export const reservationRemoved = (id: number) => ({
  type: RESERVATION_REMOVED,
  payload: { id },
});
