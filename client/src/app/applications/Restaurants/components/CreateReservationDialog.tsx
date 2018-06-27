import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";

interface ICreateReservationDialogProps {
  readonly isOpened: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (forName: string) => void;
}

type State = {
  readonly forName?: string;
};

export class CreateReservationDialog extends React.PureComponent<ICreateReservationDialogProps, State> {
  readonly state: State = {};

  _submitForName = () =>
    this.props.onSubmit(this.state.forName!);

  _changeFormName = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ forName: e.currentTarget.value });

  render() {
    const { isOpened, onClose } = this.props;

    return(
      <>
        <Dialog
          open={isOpened}
          onClose={onClose}
        >
          <DialogTitle>
            Confirm new reservation
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a reservation you need to confirm with a name,
              for which the reservation will be created.
            </DialogContentText>
            <TextField
              value={this.state.forName}
              onChange={this._changeFormName}
              autoFocus
              margin="dense"
              label="For name"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this._submitForName}
              color="primary"
              disabled={!this.state.forName}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
