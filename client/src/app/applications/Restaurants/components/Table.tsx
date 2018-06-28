import * as React from "react";
import { ITable } from "../../../../_types/ITable";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@material-ui/core";
import { ComboBox } from "../../../../_shared/Components/ComboBox";
import { blockToTimeRangeString } from "../../../../_misc/utils";

type HourBlock = {
  timeBlock: number;
  text: string;
};

const toHourBlock = (timeBlock: number): HourBlock => ({
  timeBlock,
  text: blockToTimeRangeString(timeBlock),
});


interface ITableOwnProps {
  readonly table: ITable,
  readonly createReservation: (tableId: string, block: number) => void;
}

type State = {
  readonly hourBlock: HourBlock;
  readonly table: ITable,
}

export class Table extends React.PureComponent<ITableOwnProps, State> {
  static getDerivedStateFromProps = ({ table } : ITableOwnProps, previousState?: State): Partial<State> | null => {
    if (previousState && table === previousState.table) {
      return null
    }

    return ({
      hourBlock: toHourBlock(table.freeTimeBlocks[0]),
      table,
    });
  };

  readonly state: State = {
    hourBlock: toHourBlock(this.props.table.freeTimeBlocks[ 0 ]),
    table: this.props.table,
  };

  _changeHourBlock = (hourBlock: HourBlock) =>
    this.setState({ hourBlock });

  _createReservation = () =>
    this.props.createReservation(this.props.table.id, this.state.hourBlock.timeBlock);

  _getLabel = (hourBlock: HourBlock): string =>
    hourBlock.text;

  _getId = (hourBlock: HourBlock): string =>
    hourBlock.timeBlock.toString(10);

  render() {
    const { table } = this.props;
    const { freeTimeBlocks } = table;

    const hourBlocks = freeTimeBlocks.map(toHourBlock);

    return(
      <Card>
        <CardContent>
          <Typography
            gutterBottom
            variant="headline"
            component="h2"
          >
            Table {table.number}
          </Typography>
          <Typography>
            Seats: {table.seats}
          </Typography>

          <ComboBox
            value={this.state.hourBlock}
            values={hourBlocks}
            formatValue={this._getLabel}
            getId={this._getId}
            label="Hours"
            onChange={this._changeHourBlock}
          />
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={this._createReservation}
          >
            Reserve
          </Button>
        </CardActions>
      </Card>
    );
  }
}
