import * as PropTypes from 'prop-types';


import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import IconSvg from '../Icon';
import {
  DropDownIconWrapper, StyledJobStatusSelect,
  StyledMenuItem,
  StyledMenuList,
  StyledPlaceholderTypography,
  SyledPopper,
} from './styledComponents';
import CheckIcon from '@material-ui/icons/Check';

const DropDownSelect = ({
  value,
  displayEmpty,
  items,
  width,
  ishidden,
  isStatusesUpdated,
  listStyle,
  disabled = false,
  onChange = () => { },
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = e => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
    onChange(e);
  };
  return (
    <div>
      <StyledJobStatusSelect
        onChange={onChange}
        displayEmpty={displayEmpty}
        width={width}
        ref={anchorRef}
        disabled={isStatusesUpdated || disabled}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        ishidden={ishidden}
        onClick={() => isStatusesUpdated ? {} : handleToggle()}
      >
        <StyledPlaceholderTypography disabled={isStatusesUpdated}>
          {value}
        </StyledPlaceholderTypography>
        <IconSvg
          color="mainCardTitleColor"
          icon={<ArrowDropDownIcon />}
          iconFontSize="27px"
        />
      </StyledJobStatusSelect>
      {!disabled ? (
        <SyledPopper open={open} anchorEl={anchorRef.current} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <StyledMenuList style={listStyle} autoFocusItem={open} id="menu-list-grow">
                    {items.map((item, index) => (
                      <StyledMenuItem
                        key={`${index}-${item.text}`}
                        disabled={index === 0}
                        value={item.value}
                        onClick={handleClose}
                        selected={item.text === value}
                      >
                        {!!index && <DropDownIconWrapper selected={item.text === value}>
                          <CheckIcon />
                        </DropDownIconWrapper>}
                          {item.text}
                        {index === 0 && (
                        <IconSvg
                          color="mainCardTitleColor"
                          icon={<ArrowDropUpIcon />}
                          iconFontSize="27px"
                        />
                        )}
                      </StyledMenuItem>
                    ))}
                  </StyledMenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </SyledPopper>
      ) : null}

    </div>
  );
};

export default DropDownSelect;
