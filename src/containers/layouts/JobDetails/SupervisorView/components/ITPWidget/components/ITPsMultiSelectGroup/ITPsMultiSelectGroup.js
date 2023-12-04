import {
  DropDownItemText,
  StyledCollapse,
  StyledListItem,
  VDRsITPsBlockWrapper,
  VDRsITPsStyledMenuItem,
} from '../../../styledComponents';
import { LINEJOB_NOTIFICATIONS_TYPE, libraryEmptyPlaceholder } from "../../../../../../../../constants";
import {
  MultiSelectListsWrapper,
  TextWrapper,
} from './styledComponents';
import { bindActionCreators, compose } from 'redux';
import { selectLineITPs, selectStationWidgetITPs } from '../../../../../../../../selectors/supervisorITPs';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { IsCheckedItemIcon } from '../../../../../../../../components/IsCheckedItemIcon/IsCheckedItemIcon';
import { LIBRARY_TABS } from '../../../../../../../../constants/labelsNaming';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { SignalsWarningIcon } from '../../../../../../../../components/SvgIcons/svgIcons';
import { addITPToStation } from '../../../../../../../../actions/supervisorITPs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { markNotificationsAsSupervisor } from '../../../../../../../../actions/issueRevision';
import { withRouter } from 'react-router';

const isITPChose = (item, itps) => {
  const isStationITP = itps.some(itp => itp.lineJobITPId === item.itpNumber);
  const isAddedStationITP = itps.some(itp => itp.itpNumber === item.itpNumber);
  return isStationITP || isAddedStationITP;
};

const ITPsMultiSelectGroup = ({
  openedStation,
  handleAddedEntities,
  lineJobITPs,
  stationWidgetITPs,
  addITPToStation,
  notifications,
  markNotificationsAsSupervisor,
  isDataLoading
}) => {
  const [isOpenCollapse, setIsOpenCollapse] = React.useState(false);

  const handleOpenCollaps = () => {
    setIsOpenCollapse(!isOpenCollapse);
    const readIds = notifications
      .filter(notification => notification.revisedElementType.name === LINEJOB_NOTIFICATIONS_TYPE.ITPItem)
      .map(item => item.id);
    if (readIds.length) {
      markNotificationsAsSupervisor({ items: readIds });
    }

  };
  const handleClickAway = () => {
    setIsOpenCollapse(false);
  };

  const onAddITPToStation = (number) => {
    if (openedStation.length === 0) {
      return;
    }
    const foundITP = lineJobITPs.find(item => (item.itpNumber === number));
    addITPToStation(
      {
        widgetITPs: [...stationWidgetITPs, foundITP],
      },
    );
    handleAddedEntities();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <MultiSelectListsWrapper>
        <StyledListItem
          isDataLoading={isDataLoading}
          button
          onClick={handleOpenCollaps}
          isOpen={isOpenCollapse}
        >
          <ListItemText primary={LIBRARY_TABS.itps} />
          {notifications.filter(item => item.revisedElementType.name === LINEJOB_NOTIFICATIONS_TYPE.ITPItem).length
            ? <SignalsWarningIcon color="ORANGE" />
            : null}
          {isOpenCollapse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </StyledListItem>
        <StyledCollapse in={isOpenCollapse} timeout="auto" unmountOnExit>
          {lineJobITPs.length > 0 && (
            <VDRsITPsBlockWrapper>
              {lineJobITPs.map((item) => (
                <VDRsITPsStyledMenuItem
                  isChecked={isITPChose(item, stationWidgetITPs)}
                  key={item.itpNumber}
                  id={item.itpNumber}
                >
                  <IsCheckedItemIcon isHidden={!isITPChose(item, stationWidgetITPs)} />
                  <DropDownItemText onClick={() =>
                    !isITPChose(item, stationWidgetITPs)
                    && onAddITPToStation(item.itpNumber)}
                  >
                    {item.itpNumber}
                  </DropDownItemText>
                  {notifications.filter(msg => msg.revisedElementId === item.id).length
                    ? <SignalsWarningIcon width="24" height="24" color="ORANGE" />
                    : null}
                </VDRsITPsStyledMenuItem>
              ))}
            </VDRsITPsBlockWrapper>
          )}
          {lineJobITPs && lineJobITPs.length === 0 && (
            <TextWrapper>
              {libraryEmptyPlaceholder.itps}
            </TextWrapper>
          )}
        </StyledCollapse>
      </MultiSelectListsWrapper>
    </ClickAwayListener>
  );
};

const mapStateToProps = createStructuredSelector({
  lineJobITPs: selectLineITPs(),
  stationWidgetITPs: selectStationWidgetITPs(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addITPToStation,
  markNotificationsAsSupervisor
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(ITPsMultiSelectGroup);
