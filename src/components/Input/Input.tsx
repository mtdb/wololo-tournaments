import FormControl, { FormControlClassKey } from '@material-ui/core/FormControl';
import FormHelperText, { FormHelperTextClassKey } from '@material-ui/core/FormHelperText';
import MaterialInput, { InputClassKey, InputProps } from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel, { InputLabelClassKey } from '@material-ui/core/InputLabel';
import OutlinedInput, { OutlinedInputClassKey } from '@material-ui/core/OutlinedInput';

import Create from '@material-ui/icons/Create';
import Warning from '@material-ui/icons/PriorityHigh';
import Search from '@material-ui/icons/Search';

import React, { Component } from 'react';

interface IInputProps extends InputProps {
  classes?: Partial<Record<InputClassKey | OutlinedInputClassKey, string>>;
  formControlClasses?: Partial<Record<FormControlClassKey, string>>;
  labelClasses?: Partial<Record<InputLabelClassKey, string>>;
  formHelperTextClasses?: Partial<Record<FormHelperTextClassKey, string>>;
  errorMessage?: string;
  hasError?: boolean;
  label: string;
  outlined?: boolean;
  type: 'text' | 'password' | 'email' | 'search' | 'number';
  validated?: boolean;
}

interface IInputState {
  validate: boolean;
  active: boolean;
}

class Input extends Component<IInputProps, IInputState> {
  constructor(props: IInputProps) {
    super(props);

    this.state = {
      active: false,
      validate: !!this.props.validated
    };

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  public onBlur(): void {
    this.setState({ active: false, validate: true });
  }

  public onFocus(): void {
    this.setState({ active: true, validate: true });
  }

  public render(): JSX.Element {
    const {
      id = `id-${Math.round(Math.random() * 1000000)}`,
      classes,
      formControlClasses,
      formHelperTextClasses,
      labelClasses,
      errorMessage,
      hasError,
      label,
      outlined,
      type,
      validated,
      ...commonProps
    } = this.props;
    const { active, validate } = this.state;

    const outlinedValues = outlined
      ? {
          error: outlined ? (hasError ? true : false) : null,
          labelWidth: 0,
          variant: outlined ? 'outlined' : null
        }
      : null;

    const variantCSSClasses = `${active ? 'active' : ''}`;

    return (
      <FormControl
        classes={{
          ...formControlClasses,
          root: `input override ${variantCSSClasses} ${
            formControlClasses ? formControlClasses.root || '' : ''
          }`
        }}
        error={validate && hasError}
        fullWidth={commonProps.fullWidth}
      >
        {!outlined && <Label id={id} classes={labelClasses} label={label} />}
        <ComponentInput
          classes={classes}
          id={id}
          {...commonProps}
          type={type}
          endAdornment={<EndAdornment error={!!validate && !!hasError} type={type} />}
          {...outlinedValues}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          outlined={outlined}
          autoComplete="new-password"
        />
        <HelperText
          classes={formHelperTextClasses}
          visible={!!validate && !!hasError}
          message={errorMessage}
        />
      </FormControl>
    );
  }
}

export { Input };

interface IAdornmentProps {
  type: string;
  error: boolean;
}

const Icon = ({ type, error }: IAdornmentProps) => {
  if (error) {
    return <Warning color="error" classes={{ root: 'input-icon override' }} />;
  } else if (type === 'search') {
    return <Search color="primary" classes={{ root: 'input-icon override' }} />;
  }
  return <Create color="primary" classes={{ root: 'input-icon override' }} />;
};

const EndAdornment = (props: IAdornmentProps) => (
  <InputAdornment position="end" className="input-icon override">
    <Icon {...props} />
  </InputAdornment>
);

interface ILabelProps {
  id: string;
  label: string;
  classes?: Partial<Record<InputLabelClassKey, string>>;
}
const Label = ({ id, classes, label }: ILabelProps) => (
  <InputLabel
    classes={{
      ...classes,
      root: `input-label override ${classes ? classes.root || '' : ''}`,
      shrink: `input-label--shrink override ${classes ? classes.shrink || '' : ''}`
    }}
    htmlFor={id}
  >
    {label}
  </InputLabel>
);

interface IHelperTextProps {
  visible: boolean;
  message?: string;
  classes?: Partial<Record<FormHelperTextClassKey, string>>;
}
const HelperText = ({ visible, message, classes }: IHelperTextProps) => (
  <FormHelperText
    classes={{
      ...classes,
      root: `form-helper-text override ${classes ? classes.root || '' : ''}`
    }}
  >
    {visible && message}
  </FormHelperText>
);

const ComponentInput = ({ outlined, classes, ...props }: any) => {
  const componentClasses = outlined
    ? {
        ...classes,
        error: 'material-input--error',
        input: `material-input__input override ${classes ? classes.input || '' : ''}`,
        notchedOutline: `override ${classes ? classes.notchedOutline || '' : ''}`,
        root: `material-input override ${classes ? classes.root || '' : ''}`
      }
    : {
        error: 'material-input--error',
        input: `material-input__input override ${classes ? classes.input || '' : ''}`,
        root: `material-input override ${classes ? classes.root || '' : ''}`
      };

  return outlined ? (
    <OutlinedInput {...props} classes={componentClasses} autoComplete="new-password" />
  ) : (
    <MaterialInput {...props} classes={componentClasses} autoComplete="new-password" />
  );
};
