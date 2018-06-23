import { Dispatch } from "../../../../../_types/Dispatch";
import {
  reservationRemoved,
  reservationsLoaded
} from "../actionCreators";
import { fakeBackend } from "../../../../../fakeBackend";

export const fetchReservations = () =>
  async (dispatch: Dispatch): Promise<void> => {
    const reservations = await fakeBackend.getReservations();

    dispatch(reservationsLoaded(reservations));
  };

export const cancelReservation = (id: number) =>
  async (dispatch: Dispatch): Promise<void> => {
    await fakeBackend.removeReservation(id);

    dispatch(reservationRemoved(id));
  };