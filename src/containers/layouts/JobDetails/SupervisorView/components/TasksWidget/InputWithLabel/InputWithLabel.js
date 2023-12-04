import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {
  TasksHorizontalWithLabelWrapper,
  Label,
  StyledTasksNumericInput,
} from '../styledComponents';

const InputWithLabel = ({
  label, htmlFor, id, value, isMandatory, onChange, endAdornment, ...props
}) => (
  <TasksHorizontalWithLabelWrapper>
    <Label htmlFor={htmlFor} isMandatory={isMandatory}>
      <Typography variant="body2">{label}</Typography>
    </Label>
    <StyledTasksNumericInput
      value={value}
      onChange={onChange}
      id={id}
      endAdornment={endAdornment}
      {...props}
    />
  </TasksHorizontalWithLabelWrapper>
);

InputWithLabel.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default React.memo(InputWithLabel);
