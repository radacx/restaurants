import * as React from "react";
import * as classNames from "classnames";
import {
  TextField,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";

interface INumericInputProps {
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly minValue?: number;
  readonly maxValue?: number;
  readonly label: string;
  readonly disabled?: boolean;
}

const getStyles = (theme: Theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

type Class = ReturnType<typeof getStyles>;
type NumericInputProps = INumericInputProps & WithStyles<keyof Class>;


class NumericInput extends React.PureComponent<NumericInputProps> {
  _valueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.currentTarget.value;

    const { minValue, maxValue, onChange } = this.props;

    if ((minValue !== undefined && value < minValue)
      || (maxValue !== undefined && value > maxValue)) {
      return;
    }

    this.setState({ value });
    onChange(value);
  };

  render() {
    const { label, value, disabled, classes } = this.props;

    return(
      <TextField
        label={label}
        value={value}
        onChange={this._valueChanged}
        type="number"
        className={classNames(classes.textField)}
        InputLabelProps={{ shrink: true }}
        margin="normal"
        disabled={disabled}
      />
    );
  }
}

const styledNumericInput = withStyles(getStyles)(NumericInput);

export { styledNumericInput as NumericInput };
