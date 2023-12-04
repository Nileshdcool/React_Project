import React from 'react';
import * as PropTypes from 'prop-types';
import { CustomContainedButton } from './styledComponents';

const ContainedButton = ({
  text,
  colorType,
  color,
  ishidden,
  disabled,
  icon,
  onClick = () => {},
  ...restProps
}) => (
  <CustomContainedButton
    variant="contained"
    onClick={onClick}
    colortype={colorType}
    disableRipple
    color={color}
    ishidden={ishidden}
    disabled={disabled}
    {...restProps}
  >
    {icon}
    {text}
  </CustomContainedButton>
);
ContainedButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  colorType: PropTypes.string,
  disabled: PropTypes.bool,
  ishidden: PropTypes.bool,
  onClick: PropTypes.func,
};

export default React.memo(ContainedButton);
