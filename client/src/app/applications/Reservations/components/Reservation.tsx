import * as React from "react";
import { IReservation } from "../../../../_types/IReservation";
import { blockToTimeRangeString } from "../../../../_misc/utils";
import {
  Button,
  TableCell,
} from "@material-ui/core";

interface IReservationOwnProps {
  readonly reservation: IReservation;
  readonly cancelReservation: (id: number) => void;
}

export class Reservation extends React.PureComponent<IReservationOwnProps> {
  _cancelReservation = () =>
    this.props.cancelReservation(this.props.reservation.id);

  render() {
    const { reservation } = this.props;
    const { restaurant } = reservation;
    const hoursRange = blockToTimeRangeString(reservation.block);

    return (
      <>
        <TableCell>
          {restaurant.name}
        </TableCell>
        <TableCell>
          {reservation.day.toDateString()}
        </TableCell>
        <TableCell>
          {hoursRange}
        </TableCell>
        <TableCell>
          <Button
            color="secondary"
            onClick={this._cancelReservation}
            size="small"
          >
            Cancel reservation
          </Button>
        </TableCell>
      </>
    );
  }
}
