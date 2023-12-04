import MenuItem from '@material-ui/core/MenuItem';
import * as PropTypes from 'prop-types';
import React from 'react';

import { StyledSelect } from './styledComponents';

const MainSelect = ({
  value,
  displayEmpty,
  items,
  width,
  ishidden,
  isDisableSelect,
  onChange = () => {},
  ...rest
}) => (
  <StyledSelect
    value={value}
    onChange={onChange}
    displayEmpty={displayEmpty}
    width={width}
    ishidden={ishidden}
    disableUnderline
    disabled={isDisableSelect}
    {...rest}
  >
    {items.map((item, index) => (
      <MenuItem
        key={`${index}-${item.text}`}
        value={item.value}
      >
        {item.text}
      </MenuItem>
    ))}
  </StyledSelect>
);
MainSelect.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.string,
  width: PropTypes.number,
  displayEmpty: PropTypes.bool,
  isDisableSelect: PropTypes.bool,
  ishidden: PropTypes.number,
  onChange: PropTypes.func,
};

export default MainSelect;
