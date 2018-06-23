import * as React from "react";
import {
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import {
  AppBar,
  Tab,
  Tabs
} from "@material-ui/core";

class NavBar extends React.PureComponent<RouteComponentProps<any>> {
  _navigate = (_anything: any, page: string)  =>
    this.props.history.push(page);

  render() {
    const { history } = this.props;

    return (
      <AppBar
        title="Restaurants"
        position="static"
      >
        <Tabs
          value={history.location.pathname}
          onChange={this._navigate}
        >
          <Tab
            value="/"
            label="Restaurants"
          />
          <Tab
            value="/reservations"
            label="Current reservations"
          />
        </Tabs>
      </AppBar>
    );
  }
}

const navbarWithRouterProps = withRouter(NavBar);

export { navbarWithRouterProps as NavBar };

