import * as React from "react";
import { Snackbar } from "@material-ui/core";
import { SnackBarOrigin } from "@material-ui/core/Snackbar";
import { SuccessSnackbarContent } from "./SuccessSnackbarContent";

const snackBarOrigin: SnackBarOrigin = { vertical: 'bottom', horizontal: 'left' };

interface ISnackBarMessageProps {
  readonly message: string;
}

export const SnackBarMessage: React.StatelessComponent<ISnackBarMessageProps> = ({ message }) => (
  <span>
    {message}
  </span>
);

interface IReservationCreatedSnackBarProps {
  readonly open: boolean;
  readonly message: string;
  readonly navigationMessage: string;
  readonly onClose: () => void;
  readonly onNavigation: () => void;
}

export const ReservationCreatedSnackbar: React.StatelessComponent<IReservationCreatedSnackBarProps> = ({ navigationMessage, onNavigation, open, onClose, message }) => (
  <Snackbar
    anchorOrigin={snackBarOrigin}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
  >
    <SuccessSnackbarContent
      onClose={onClose}
      onNavigation={onNavigation}
      message={message}
      navigationMessage={navigationMessage}
    />
  </Snackbar>
);

