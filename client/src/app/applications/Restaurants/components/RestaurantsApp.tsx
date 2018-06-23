import * as React from 'react';
import { Restaurants } from "../containers/Restaurants";

export interface IRestaurantsAppCallbackProps {
  readonly fetchRestaurants: () => Promise<void>;
}

interface IState {
  readonly initialized: boolean;
}

export class RestaurantsApp extends React.PureComponent<IRestaurantsAppCallbackProps> {
  readonly state: IState = {
    initialized: false,
  };
  
  async componentDidMount() {
    await this.props.fetchRestaurants();

    this.setState({ initialized: true });
  }

  render() {
    if (!this.state.initialized) {
      // TODO loader
      return null;
    }

    return <Restaurants />;
  }
}
