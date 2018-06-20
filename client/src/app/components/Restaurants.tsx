import * as React from "react";
import { IRestaurant } from "../../_types/IRestaurant";
import { ComboBox } from "./ComboBox";

export interface IRestaurantsDataProps {
  readonly restaurants: IRestaurant[];
}

type State = {
  readonly selectedRestaurant?: IRestaurant;
}

export class Restaurants extends React.PureComponent<IRestaurantsDataProps, State> {
  readonly state: State = {
    selectedRestaurant: undefined,
  };

  _getLabel = (restaurant: IRestaurant) => restaurant.name;

  _onRestaurantSelected = (restaurant: IRestaurant) => this.setState({
    selectedRestaurant: restaurant,
  });

  render() {
    const { restaurants } = this.props;

    return(
      <div>
        <ComboBox
          values={restaurants}
          getLabel={this._getLabel}
          placeholder="Select a restaurant..."
          onChange={this._onRestaurantSelected}
        />
      </div>
    );
  }
}
