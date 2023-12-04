import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import InputMask from 'react-input-mask';
import {
  TasksHorizontalWithLabelWrapper,
  Label,
  StyledTasksNumericInput,
} from '../styledComponents';

const InputWithLabel = ({
  label, htmlFor, id, value, isMandatory, onChange, endAdornment, type, mask
}) => (
  <TasksHorizontalWithLabelWrapper>
    <Label htmlFor={htmlFor} isMandatory={isMandatory}>
      <Typography variant="body2">{label}</Typography>
    </Label>
    <InputMask
      mask={mask}
      formatChars={{
        '5': '[0-5]',
        '9': '[1-9]',
      }}
      maskChar=''
      value={value}
      onChange={onChange}
    >
      {(inputProps) => (
        <StyledTasksNumericInput
          id={id}
          type={type}
          endAdornment={endAdornment}
          {...inputProps}
        />
      )}
    </InputMask>
  </TasksHorizontalWithLabelWrapper>
);

InputWithLabel.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default React.memo(InputWithLabel);
