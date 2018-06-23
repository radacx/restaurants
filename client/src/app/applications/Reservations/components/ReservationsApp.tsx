import * as React from "react";
import { ReservationsList } from "../containers/ReservationsList";

export interface IReservationsAppCallbackProps {
  readonly fetchReservations: () => Promise<void>;
}

type State = {
  readonly initialized: boolean;
}

export class ReservationsApp extends React.PureComponent<IReservationsAppCallbackProps, State> {
  readonly state: State = {
    initialized: false,
  };

  async componentDidMount() {
    await this.props.fetchReservations();

    this.setState({ initialized: true });
  }

  render() {
    if (!this.state.initialized) {
      return null;
      // TODO loader
    }

    return <ReservationsList />;
  }
}