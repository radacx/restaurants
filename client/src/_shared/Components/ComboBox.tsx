import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {
  FormControl,
  InputLabel,
  Select,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";

const getStyles = (theme: Theme) => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

type Classes = ReturnType<typeof getStyles>;

interface IProps<TValue> {
  readonly placeholder?: string;
  readonly label: string;
  readonly values: TValue[];
  readonly onChange: (value: TValue) => void;
  readonly value?: TValue;
  readonly formatValue: (value: TValue) => number | string;
  readonly getId: (value: TValue) => number;
  readonly hasError?: boolean;
}

type Props<TValue> = IProps<TValue> & WithStyles<keyof Classes>;

class ComboBox<TValue> extends React.PureComponent<Props<TValue>> {
  _valueChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = +e.currentTarget.attributes['data-value'].nodeValue;

    const { values, getId, onChange } = this.props;
    const value = values.find(v => getId(v) === id);

    onChange(value!);
  };

  render() {
    const { hasError, value, formatValue, values, label, classes, getId, placeholder } = this.props;

    const selectedId = value && getId(value);

    const menuItems = values.map(v => {
      const id = getId(v);

      return (
        <MenuItem
          key={id}
          value={id}
        >
          {formatValue(v)}
        </MenuItem>
      )
    });

    return(
      <FormControl
        error={hasError}
        className={classes.formControl}
      >
        <InputLabel
          htmlFor="ComboBox"
          shrink={!!selectedId}
        >
          {selectedId ? label : placeholder || label}
        </InputLabel>
        <Select
          id="ComboBox"
          value={selectedId || -1}
          onChange={this._valueChanged}
        >
          {menuItems}
        </Select>
      </FormControl>
    );
  }
}

const styledComboBox = withStyles(getStyles)(ComboBox);

export { styledComboBox as ComboBox };
