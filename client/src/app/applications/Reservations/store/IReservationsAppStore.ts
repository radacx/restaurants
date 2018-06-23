import { IReservation } from "../../../../_types/IReservation";

export interface IReservationsAppStore {
  reservations: {
    [index: number]: IReservation,
  };
}
