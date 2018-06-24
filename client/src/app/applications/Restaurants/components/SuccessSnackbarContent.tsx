import {
  Button,
  IconButton,
  SnackbarContent,
  Theme,
  WithStyles,
  withStyles
} from "@material-ui/core";
import * as React from "react";
import * as classNames from "classnames";
import { green } from "@material-ui/core/colors";
import {
  CheckCircle,
  Close
} from "@material-ui/icons";

const getStyles = (theme: Theme) => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

interface ISuccessSnackbarContentProps {
  readonly message: string;
  readonly navigationMessage: string;
  readonly onClose: () => void;
  readonly onNavigation: () => void;
}

type Classes = ReturnType<typeof getStyles>;
type Props = ISuccessSnackbarContentProps & WithStyles<keyof Classes>;

const SuccessSnackbarContent: React.StatelessComponent<Props> = ({ navigationMessage, classes, message, onClose, onNavigation,  ...other }) => (
  <SnackbarContent
    className={classes.success}
    message={
      <span className={classes.message}>
        <CheckCircle className={classNames(classes.icon, classes.iconVariant)} />
        {message}
      </span>
    }
    action={
      <>
        <Button
          color="primary"
          size="small"
          onClick={onNavigation}
        >
          {navigationMessage}
        </Button>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <Close className={classes.icon} />
        </IconButton>
      </>
    }
    {...other}
  />
);

const styledSuccessSnackbarContent = withStyles(getStyles)(SuccessSnackbarContent);

export { styledSuccessSnackbarContent as SuccessSnackbarContent };
