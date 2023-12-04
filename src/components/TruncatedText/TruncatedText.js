import React from 'react';
import * as PropTypes from 'prop-types';
import { StyledTypography } from './styledComponents';

export const TruncatedText = React.memo(({ text, variant }) => (
  <StyledTypography variant={variant}>
    {text}
  </StyledTypography>
));

TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
};
