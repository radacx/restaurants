import * as React from "react";
import { TextField } from "@material-ui/core";
import {
  hourToString,
  stringToHours
} from "../../_misc/utils";

interface IHourPickerProps {
  readonly className: string;
  readonly label: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly disabled: boolean;
}

export class HourPicker extends React.PureComponent<IHourPickerProps> {
  _hourChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = stringToHours(e.currentTarget.value);
    this.props.onChange(hours);
  };

  render() {
    const value = hourToString(this.props.value);

    return(
      <TextField
        className={this.props.className}
        value={value}
        onChange={this._hourChanged}
        label={this.props.label}
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: this.props.disabled ? 60 : 3600,
        }}
        disabled={this.props.disabled}
      />
    );
  }
}