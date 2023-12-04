import React from 'react';
import * as PropTypes from 'prop-types';
import { StyledIcon } from './styledComponents';
import { ICONS_COLORS } from '../../constants';

const IconSvg = ({
  color,
  icon,
  iconFontSize,
  iconWidth,
  iconHeight,
  fontSize,
}) => (
  <StyledIcon
    iconcolor={ICONS_COLORS[color]}
    iconsize={iconFontSize}
    iconwidth={iconWidth}
    iconheight={iconHeight}
    fontSize={fontSize}
  >
    {icon}
  </StyledIcon>
);
IconSvg.propTypes = {
  icon: PropTypes.instanceOf(Object).isRequired,
  color: PropTypes.string,
  iconFontSize: PropTypes.string,
  iconWidth: PropTypes.string,
  iconHeight: PropTypes.string,
  fontSize: PropTypes.string,
};

export default React.memo(IconSvg);
