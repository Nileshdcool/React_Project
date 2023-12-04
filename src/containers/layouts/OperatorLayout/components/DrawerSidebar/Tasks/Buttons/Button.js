import React from 'react';
import { ChecksContainedButton } from '../styledComponents';

export const ChecksButton = React.memo(({
  text,
  colorType,
  disabled,
  icon,
  onClick = () => {},
  ...restProps
}) => (
  <ChecksContainedButton
    disableRipple
    color="primary"
    variant="contained"
    onClick={onClick}
    colortype={colorType}
    disabled={disabled}
    {...restProps}
  >
    {text}
  </ChecksContainedButton>
));
