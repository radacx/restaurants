import * as React from "react";
import { IRestaurant } from "../../../../_types/IRestaurant";
import { ComboBox } from "../../../../_shared/Components/ComboBox";
import DatePicker from "material-ui-pickers/DatePicker";
import { IFreeTablesRequest } from "../../../../_types/IFreeTablesRequest";
import { Restaurant } from "../containers/Restaurant";
import { fakeBackend } from "../../../../fakeBackend";
import { RouteComponentProps } from "react-router";
import {
  Button,
  Theme,
  WithStyles,
  withStyles,
  Checkbox,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import * as classNames from "classnames";
import { NumericInput } from "../../../../_shared/Components/NumericInput";

export interface IRestaurantsDataProps {
  readonly restaurants: IRestaurant[];
}

export interface IRestaurantsCallbackProps {
  readonly getFreeTables: (restaurantId: number, freeTablesRequest: IFreeTablesRequest) => void;
}

type State = {
  readonly restaurant?: IRestaurant;
  readonly day: Date | null;
  readonly hoursFrom: number;
  readonly hoursTo: number;
  readonly seats: number;
  readonly wholeDay: boolean;
}

const getStyles = (theme: Theme) => ({
  searchButton: {
    margin: theme.spacing.unit,
  },
  datePicker: {
    margin: theme.spacing.unit,
  },
});

type Classes = ReturnType<typeof getStyles>;
type Props = IRestaurantsDataProps
  & IRestaurantsCallbackProps
  & RouteComponentProps<any>
  & WithStyles<keyof Classes>;

class Restaurants extends React.PureComponent<Props, State> {
  readonly state: State = {
    day: null,
    seats: 2,
    wholeDay: true,
    hoursFrom: 0,
    hoursTo: 0,
  };

  _getLabel = (restaurant: IRestaurant) => restaurant.name;

  _getId = (restaurant: IRestaurant) => restaurant.id;

  _onRestaurantSelected = (restaurant: IRestaurant) =>
    this.setState({ restaurant });

  _changeDate = (day: Date) =>
    this.setState({ day });

  _changeFrom = (hoursFrom: number) =>
    this.setState({ hoursFrom });

  _changeTo = (hoursTo: number) =>
    this.setState({ hoursTo });

  _seatsChanged = (seats: number) =>
    this.setState({ seats });

  _toggleWholeDay = (_event: any, wholeDay: boolean) =>
    this.setState({ wholeDay });

  _searchFreeTables = () => {
    const { wholeDay, restaurant, hoursFrom, hoursTo, day, seats } = this.state;
    const freeTablesRequest: IFreeTablesRequest = {
      day: day!,
      hoursFrom,
      hoursTo,
      seats,
      wholeDay,
    };

    this.props.getFreeTables(restaurant!.id, freeTablesRequest)
  };

  _createReservation = async (tableId: number, block: number) => {
    const { restaurant, day } = this.state;

    if (!restaurant) {
      return;
    }

    await fakeBackend.createReservation(restaurant.id, {
      block,
      tableId,
      day: day!,
    });

    this.props.history.push('/reservations');
  };

  render() {
    const { restaurants, classes } = this.props;
    const { wholeDay, restaurant, hoursTo, hoursFrom, day } = this.state;

    const disableTimePicker = wholeDay;
    const searchDisabled = !restaurant || !day || (!wholeDay && (!hoursFrom || !hoursTo));

    const today = new Date();
    const todaysDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return(
      <>
        <FormControl>
          <ComboBox
            value={this.state.restaurant}
            values={restaurants}
            formatValue={this._getLabel}
            getId={this._getId}
            label="Restaurant"
            placeholder="Choose a restaurant..."
            onChange={this._onRestaurantSelected}
          />

          <FormControl className={classNames(classes.datePicker)}>
            <DatePicker
              clearable
              label={this.state.day ? 'Date' : 'Choose a date...'}
              minDate={todaysDate}
              value={this.state.day}
              onChange={this._changeDate}
              animateYearScrolling={false}
            />
          </FormControl>

          <NumericInput
            label="From"
            value={this.state.hoursFrom}
            onChange={this._changeFrom}
            disabled={disableTimePicker}
            minValue={0}
            maxValue={23}
          />

          <NumericInput
            label="To"
            value={this.state.hoursTo}
            onChange={this._changeTo}
            disabled={disableTimePicker}
            minValue={0}
            maxValue={23}
          />

          <NumericInput
            label="Seats"
            value={this.state.seats}
            onChange={this._seatsChanged}
            minValue={1}
          />

          <FormControlLabel
            label="Whole day"
            control={(
              <Checkbox
                checked={this.state.wholeDay}
                onChange={this._toggleWholeDay}
              />
            )}
          />

          <Button
            onClick={this._searchFreeTables}
            disabled={searchDisabled}
            color="primary"
            variant="contained"
            className={classNames(classes.searchButton)}
          >
            Find free tables
          </Button>
        </FormControl>
        <Restaurant createReservation={this._createReservation} />
      </>
    );
  }
}

const styledRestaurants = withStyles(getStyles)(Restaurants);

export { styledRestaurants as Restaurants };