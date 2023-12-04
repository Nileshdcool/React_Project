import * as PropTypes from 'prop-types';


import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import {
  DropDownWrapper,
  NoStationsPlaceholder,
  StationsListWrapper,
  StyledMenuItem,
  StyledMenuList,
  StyledMenuListWrapper,
  StyledPlaceholderTypography,
  StyledSelect, StyledTitleItem,
  SyledPopper,
} from './styledComponents';
import {StyledSearchInput} from "../styledComponents";

const choosePlaceholder = (stations) => {

  if (isAllStationsChoosed(stations)) {
    return (
      <NoStationsPlaceholder color="secondary">
        No Stations
      </NoStationsPlaceholder>
    );
  }
  return (
    <NoStationsPlaceholder color="secondary">
      No Results
    </NoStationsPlaceholder>
  );
};

const isAllStationsChoosed = (stations) => {
  const filteredStations = stations.filter(item => !item.isStationChoosed);
  return filteredStations.length === 0;
};

const DropDownSelectStation = ({
  value,
  displayEmpty,
  items,
  stations,
  onStationSearch,
  onChange = () => {},
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
    <DropDownWrapper>
      <StyledSelect
        onChange={onChange}
        displayEmpty={displayEmpty}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <StyledPlaceholderTypography>
          {value}
        </StyledPlaceholderTypography>
        <ArrowDropDownIcon />
      </StyledSelect>

      <SyledPopper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <StyledMenuListWrapper>
                  <StyledTitleItem
                    disabled
                  >
                    {value}
                    <ArrowDropUpIcon />
                  </StyledTitleItem>
                  <StyledSearchInput
                    onChange={onStationSearch}
                    placeholder={isAllStationsChoosed(stations) ? 'No stations' : 'Search by Station'}
                    startAdornment={(
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )}
                  />
                  <StationsListWrapper>
                    {items.length > 0 && !isAllStationsChoosed(stations) ? (
                      <StyledMenuList>
                        {items.map((item, index) => !item.isStationChoosed && (
                        <StyledMenuItem
                          key={`${index}-${item.name}`}
                          value={item.id}
                          onClick={handleClose}
                        >
                          {item.name.toUpperCase()}
                        </StyledMenuItem>
                        ))}
                      </StyledMenuList>
                    ) : (
                      choosePlaceholder(stations)
                    )}
                  </StationsListWrapper>
                </StyledMenuListWrapper>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </SyledPopper>

    </DropDownWrapper>
  );
};
DropDownSelectStation.propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
  stations: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.string,
  variant: PropTypes.string,
  width: PropTypes.number,
  displayEmpty: PropTypes.bool,
  isStatusesUpdated: PropTypes.bool,
  ishidden: PropTypes.number,
  onChange: PropTypes.func,
  onStationSearch: PropTypes.func,
};

export default DropDownSelectStation;
