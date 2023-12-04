import React from 'react';
import * as PropTypes from 'prop-types';
import { StyledIconButton } from './styledComponents';
import { ICONS_COLORS } from '../../constants';

const CustomIconButton = ({
  color,
  disableRipple,
  disableFocusRipple,
  icon,
  onClick = () => {},
  iconFontSize,
  backimage,
  borderradius,
  padding,
  backimagehover,
  position,
  right,
}) => (
  <StyledIconButton
    onClick={onClick}
    disableRipple={disableRipple}
    disableFocusRipple={disableFocusRipple}
    iconcolor={ICONS_COLORS[color]}
    iconsize={iconFontSize}
    backimage={backimage}
    backimagehover={backimagehover}
    borderradius={borderradius}
    padding={padding}
    position={position}
    right={right}
  >
    {icon}
  </StyledIconButton>
);
CustomIconButton.propTypes = {
  icon: PropTypes.instanceOf(Object).isRequired,
  color: PropTypes.string,
  iconFontSize: PropTypes.string,
  disableRipple: PropTypes.bool,
  disableFocusRipple: PropTypes.bool,
  onClick: PropTypes.func,
  backimage: PropTypes.string,
  backimagehover: PropTypes.string,
  borderradius: PropTypes.string,
  padding: PropTypes.string,
  position: PropTypes.string,
  right: PropTypes.string
};

export default React.memo(CustomIconButton);
