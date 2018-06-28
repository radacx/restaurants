import * as React from "react";
import { ITable } from "../../../../_types/ITable";
import { Table } from "./Table";
import {
  GridList,
  GridListTile,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";

export interface IRestaurantOwnProps {
  readonly createReservation: (tableId: string, block: number) => void;
}

export interface IRestaurantDataProps {
  freeTables: ITable[];
}

const getStyles = (theme: Theme) => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  listTile: {
    border: '3px solid black',
    marginLeft: 5,
  },
});

type Classes = ReturnType<typeof getStyles>;
type Props = IRestaurantDataProps
  & IRestaurantOwnProps
  & WithStyles<keyof Classes>;

const Restaurant: React.StatelessComponent<Props> = ({ freeTables, createReservation, classes }) => (
  <div className={classes.root}>
    <GridList
      cellHeight="auto"
      cols={5}
    >
      {freeTables.map(table => (
        <GridListTile
          key={table.id}
          className={classes.listTile}
        >
          <Table
            table={table}
            createReservation={createReservation}
          />
        </GridListTile>))}
    </GridList>
  </div>
);

const styledRestaurant = withStyles(getStyles as any)(Restaurant);

export { styledRestaurant as Restaurant };
