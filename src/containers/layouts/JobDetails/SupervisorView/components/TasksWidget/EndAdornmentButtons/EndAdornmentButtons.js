import React from 'react';
import PropTypes from 'prop-types';
import {ArrowDropDown, ArrowDropUp, ArrowsWrapper, EndAdornmentWrapper} from '../styledComponents';

const EndAdornmentButtons = ({
  onIncrement, onDecrement,
}) => (
  <EndAdornmentWrapper>
    <ArrowsWrapper onClick={onIncrement}>
      <ArrowDropUp/>
    </ArrowsWrapper>
    <ArrowsWrapper onClick={onDecrement}>
      <ArrowDropDown/>
    </ArrowsWrapper>
  </EndAdornmentWrapper>
);

EndAdornmentButtons.propTypes = {
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
};

export default React.memo(EndAdornmentButtons);
