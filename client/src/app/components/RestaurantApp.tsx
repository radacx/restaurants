import * as React from 'react';
import { Restaurants } from "../containers/Restaurants";

export interface IRestaurantAppCallbackProps {
  readonly fetchRestaurants: () => Promise<void>;
}

interface IState {
  readonly initialized: boolean;
}

export class RestaurantApp extends React.PureComponent<IRestaurantAppCallbackProps> {
  readonly state: IState = {
    initialized: false,
  };
  
  async componentDidMount() {
    await this.props.fetchRestaurants();

    this.setState({ initialized: true });
  }

  render() {
    if (!this.state.initialized) {
      return null;
    }

    return <Restaurants />;
  }
}
