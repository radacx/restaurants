import * as React from "react";
import { connect } from "react-redux";
import {
  IReservationsAppCallbackProps,
  ReservationsApp as ReservationsAppComponent
} from "../components/ReservationsApp";
import { Dispatch } from "../../../../_types/Dispatch";
import { fetchReservations } from "../actions/thunk";

const mapDispatchToProps = (dispatch: Dispatch): IReservationsAppCallbackProps => ({
  fetchReservations: () => dispatch(fetchReservations()),
});

export const ReservationsApp: React.ComponentClass = connect(
  undefined,
  mapDispatchToProps,
)(ReservationsAppComponent);
