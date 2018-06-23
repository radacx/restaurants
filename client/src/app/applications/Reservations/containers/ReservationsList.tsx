import * as React from "react";
import { connect } from "react-redux";
import {
  IReservationsListCallbackProps,
  IReservationsListDataProps,
  ReservationsList as ReservationsListComponent
} from "../components/ReservationsList";
import { IStore } from "../../../../store/IStore";
import { Dispatch } from "../../../../_types/Dispatch";
import { cancelReservation } from "../actions/thunk";

const mapStateToProps = ({ reservationsApp: { reservations } }: IStore): IReservationsListDataProps => ({
  reservations: Object
    .keys(reservations)
    .map(key => reservations[key]),
});

const mapDispatchToProps = (dispatch: Dispatch): IReservationsListCallbackProps => ({
  cancelReservation: (id: number) => dispatch(cancelReservation(id)),
});

export const ReservationsList: React.ComponentClass = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReservationsListComponent);
