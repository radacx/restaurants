import { Dispatch } from "../../../../../_types/Dispatch";
import {
  reservationRemoved,
  reservationsLoaded
} from "../actionCreators";
import { backend } from "../../../../../_misc/backend";

export const fetchReservations = () =>
  async (dispatch: Dispatch): Promise<void> => {
    const reservations = await backend.getReservations();

    dispatch(reservationsLoaded(reservations));
  };

export const cancelReservation = (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    await backend.removeReservation(id);

    dispatch(reservationRemoved(id));
  };