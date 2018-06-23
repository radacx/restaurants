import { IReservation } from "../../../../_types/IReservation";
import * as React from "react";
import { Reservation } from "./Reservation";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export interface IReservationsListDataProps {
  readonly reservations: IReservation[];
}

export interface IReservationsListCallbackProps {
  readonly cancelReservation: (id: number) => void;
}

type ReservationsListProps = IReservationsListDataProps
  & IReservationsListCallbackProps;

export const ReservationsList: React.StatelessComponent<ReservationsListProps> = ({ reservations, cancelReservation }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Restaurant</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Time</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
    {reservations.map(reservation => (
      <TableRow key={reservation.id}>
        <Reservation
          reservation={reservation}
          cancelReservation={cancelReservation}
        />
      </TableRow>
    ))}
  </Table>
);
