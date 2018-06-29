import * as React from "react";
import { IRestaurant } from "../../../../_types/IRestaurant";
import { ComboBox } from "../../../../_shared/Components/ComboBox";
import DatePicker from "material-ui-pickers/DatePicker";
import { IFreeTablesRequest } from "../../../../_types/IFreeTablesRequest";
import { Restaurant } from "../containers/Restaurant";
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
import { ReservationCreatedSnackbar } from "./ReservationCreatedSnackbar";
import { INewReservation } from "../../../../_types/INewReservation";
import { CreateReservationDialog } from "./CreateReservationDialog";
import { HourPicker } from "../../../../_shared/Components/HourPicker";
import { dateToString } from "../../../../_misc/utils";

export interface IRestaurantsDataProps {
  readonly restaurants: IRestaurant[];
}

export interface IRestaurantsCallbackProps {
  readonly getFreeTables: (restaurantId: string, freeTablesRequest: IFreeTablesRequest) => void;
  readonly createReservation: (restaurantId: string, reservation: INewReservation) => void;
}

type State = {
  readonly restaurant?: IRestaurant;
  readonly day: Date | null;
  readonly hoursFrom: number;
  readonly hoursTo: number;
  readonly seats: number;
  readonly wholeDay: boolean;
  readonly openSnackbar: boolean;
  readonly openCreateReservationDialog: boolean;
  readonly block: number;
  readonly tableId: string;
  readonly restaurantError: boolean;
  readonly dateError: boolean;
}

const getStyles = (theme: Theme) => ({
  searchButton: {
    margin: theme.spacing.unit,
  },
  datePicker: {
    margin: theme.spacing.unit,
  },
  timePicker: {
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
    hoursFrom: 6,
    hoursTo: 18,
    openSnackbar: false,
    openCreateReservationDialog: false,
    tableId: '',
    block: -1,
    restaurantError: false,
    dateError: false,
  };

  _getLabel = (restaurant: IRestaurant) => restaurant.name;

  _getId = (restaurant: IRestaurant) => restaurant.id;

  _onRestaurantSelected = (restaurant: IRestaurant) =>
    this.setState({
      restaurant,
      restaurantError: false,
    });

  _changeDate = (day: Date) =>
    this.setState({
      day,
      dateError: false,
    });

  _changeFrom = (hoursFrom: number) =>
    this.setState({ hoursFrom });

  _changeTo = (hoursTo: number) =>
    this.setState({ hoursTo });

  _seatsChanged = (seats: number) =>
    this.setState({ seats });

  _toggleWholeDay = (_event: any, wholeDay: boolean) =>
    this.setState({ wholeDay });

  _closeCreateReservationDialog = () =>
    this.setState({ openCreateReservationDialog: false });

  _submitNewReservation = (forName: string) => {
    const { restaurant, day: date, block, tableId } = this.state;

    if (!restaurant || !date) {
      return;
    }

    const day = dateToString(date);

    const reservation: INewReservation = {
      block,
      tableId,
      forName,
      day,
    };
    this.props.createReservation(restaurant.id, reservation);

    this.setState({
      openCreateReservationDialog: false,
      openSnackbar: true,
    });
  };

  _searchFreeTables = () => {
    const { wholeDay, restaurant, hoursFrom, hoursTo, day: date, seats } = this.state;

    if (!restaurant || !date) {
      this.setState({
        dateError: !date,
        restaurantError: !restaurant,
      });
      return;
    }

    const day = dateToString(date);

    const freeTablesRequest: IFreeTablesRequest = {
      day,
      hoursFrom,
      hoursTo,
      seats,
      wholeDay,
    };

    this.props.getFreeTables(restaurant.id, freeTablesRequest)
  };

  _createReservation = async (tableId: string, block: number) => {
    this.setState({
      openCreateReservationDialog: true,
      tableId,
      block,
    });
  };

  _hideSnackBar = () => this.setState({ openSnackbar: false });

  _navigateToReservations = () =>
    this.props.history.push('/reservations');

  render() {
    const { restaurants, classes } = this.props;
    const disableTimePicker = this.state.wholeDay;

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
            hasError={this.state.restaurantError}
          />

          <FormControl className={classNames(classes.datePicker)}>
            <DatePicker
              clearable
              label={this.state.day ? 'Date' : 'Choose a date...'}
              minDate={todaysDate}
              value={this.state.day}
              onChange={this._changeDate}
              animateYearScrolling={false}
              error={this.state.dateError}
            />
          </FormControl>

          <HourPicker
            className={classes.timePicker}
            label="From"
            value={this.state.hoursFrom}
            onChange={this._changeFrom}
            disabled={disableTimePicker}
          />

          <HourPicker
            className={classes.timePicker}
            label="To"
            value={this.state.hoursTo}
            onChange={this._changeTo}
            disabled={disableTimePicker}
          />

          <NumericInput
            label="Seats"
            value={this.state.seats}
            onChange={this._seatsChanged}
            minValue={2}
            maxValue={5}
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
            color="primary"
            variant="contained"
            className={classNames(classes.searchButton)}
          >
            Find free tables
          </Button>
        </FormControl>
        <Restaurant createReservation={this._createReservation} />

        <ReservationCreatedSnackbar
          message="Reservation created"
          navigationMessage="Go to reservations"
          open={this.state.openSnackbar}
          onClose={this._hideSnackBar}
          onNavigation={this._navigateToReservations}
        />

        <CreateReservationDialog
          isOpened={this.state.openCreateReservationDialog}
          onClose={this._closeCreateReservationDialog}
          onSubmit={this._submitNewReservation}
        />
      </>
    );
  }
}

const styledRestaurants = withStyles(getStyles)(Restaurants);

export { styledRestaurants as Restaurants };
