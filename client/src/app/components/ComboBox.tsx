import * as React from 'react';
import * as PropTypes from 'prop-types';
import Downshift from 'downshift';
import {
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {
  StyleRules,
  WithStyles
} from "@material-ui/core/styles/withStyles";

const renderInput: React.StatelessComponent<any> = ({ InputProps, classes, ref, ...other }) => (
  <TextField
    InputProps={{
      inputRef: ref,
      classes: {
        root: classes.inputRoot,
      },
      ...InputProps,
    }}
    {...other}
  />
);

type Value = {
  label: string;
};

type RenderSuggestionProps<TValue extends Value> = {
  readonly suggestion: string;
  readonly index?: number;
  readonly itemProps?: object;
  readonly highlightedIndex?: number | null;
  readonly selectedItem?: TValue;
};

const renderSuggestion: React.StatelessComponent<RenderSuggestionProps<Value>> = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected = ((selectedItem && selectedItem.label) || '').indexOf(suggestion) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion}
    </MenuItem>
  );
};

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

const getSuggestions = <TValue extends object>(values: TValue[], inputValue: string | null, getLabel: (value: TValue) => string ) => {
  let count = 0;

  return values
    .map(value => Object.assign({}, value, { label: getLabel(value) }))
    .filter(value => {
      const keep =
        (!inputValue || value.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
        count < 5;

      if (keep) {
        count += 1;
      }

      return keep;
    });
};

const getStyles = (theme: Theme): StyleRules<string> => ({
  root: {
    flexGrow: 1,
    width: 300,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

interface IComboBoxOwnProps<TValue> {
  readonly values: TValue[];
  readonly getLabel: (value: TValue) => string;
  readonly placeholder: string;
  readonly onChange?: (value: TValue) => void;
}

type ComboBoxProps<TValue> = WithStyles & IComboBoxOwnProps<TValue>;

type ComboBoxState = {
  readonly isOpen: boolean;
}

class ComboBox<TValue extends object> extends React.PureComponent<ComboBoxProps<TValue>, ComboBoxState> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    values: PropTypes.arrayOf(PropTypes.object.isRequired),
    getLabel: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  readonly state: ComboBoxState = {
    isOpen: false,
  };

  _open = () => this.setState({ isOpen: true });

  _close = () => this.setState({ isOpen: false });

  render() {
    const { classes, values, getLabel, placeholder } = this.props;

    return(
      <div className={classes.root} onClick={this._open}>
        <Downshift itemToString={getLabel} isOpen={this.state.isOpen} onStateChange={this._open} onSelect={this._close} onChange={this.props.onChange}>
          {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  placeholder,
                }),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(values, inputValue, getLabel).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion: suggestion.label,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

const ComboBoxWithStyles = withStyles(getStyles)(ComboBox);

export { ComboBoxWithStyles as ComboBox };
