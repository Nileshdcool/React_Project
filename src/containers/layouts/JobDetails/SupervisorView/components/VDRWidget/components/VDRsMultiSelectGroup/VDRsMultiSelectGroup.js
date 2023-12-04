import {
  DropDownItemText,
  StyledCollapse,
  StyledListItem,
  VDRsITPsBlockWrapper,
  VDRsITPsStyledMenuItem,
} from '../../../styledComponents';
import {
  MultiSelectListsWrapper,
  TextWrapper,
} from './styledComponents';
import { bindActionCreators, compose } from 'redux';
import { selectLineVDRs, selectStationWidgetVDRs } from '../../../../../../../../selectors/supervisorVDRs';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {IsCheckedItemIcon} from "../../../../../../../../components/IsCheckedItemIcon/IsCheckedItemIcon";
import { LIBRARY_TABS } from '../../../../../../../../constants/labelsNaming';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { addVDRToStation } from '../../../../../../../../actions/supervisorVDRs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {libraryEmptyPlaceholder} from "../../../../../../../../constants";
import { withRouter } from 'react-router';

const isVDRChose = (item, vdrs) => {
  const isStationVDR = vdrs.some(vdr => vdr.lineJobVDRId === item.vdrId);
  const isAddedStationVDR = vdrs.some(vdr => vdr.vdrId === item.vdrId);
  return isStationVDR || isAddedStationVDR;
};

const VDRsMultiSelectGroup = ({
  openedStation,
  handleAddedEntities,
  lineJobVDRs,
  stationWidgetVDRs,
  addVDRToStation,
  isDataLoading
}) => {
  const [isOpenCollapse, setIsOpenCollapse] = React.useState(false);

  const handleOpenCollaps = () => {
    setIsOpenCollapse(!isOpenCollapse);
  };
  const handleClickAway = () => {
    setIsOpenCollapse(false);
  };

  const onAddVDRToStation = (id) => {
    if (openedStation.length === 0) {
      return;
    }
    const foundVDR = lineJobVDRs.find(item => (item.vdrId === id));
    addVDRToStation(
      {
        widgetVDRs: [...stationWidgetVDRs,
          { ...foundVDR, sortIndex: stationWidgetVDRs.length },
        ],
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
          <ListItemText primary={LIBRARY_TABS.vdrs} />
          {isOpenCollapse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </StyledListItem>
        <StyledCollapse in={isOpenCollapse} timeout="auto" unmountOnExit>
          {lineJobVDRs.length > 0 && (
            <VDRsITPsBlockWrapper>
              {lineJobVDRs.map((item) => (
                <VDRsITPsStyledMenuItem
                  isChecked={isVDRChose(item, stationWidgetVDRs)}
                  key={item.vdrId}
                  id={item.vdrId}
                >
                  <IsCheckedItemIcon isHidden={!isVDRChose(item, stationWidgetVDRs)}/>
                  <DropDownItemText onClick={() =>
                    !isVDRChose(item, stationWidgetVDRs)
                    && onAddVDRToStation(item.vdrId)}
                  >
                    {`${item.sequence} - ${item.subject}`}
                  </DropDownItemText>
                </VDRsITPsStyledMenuItem>
              ))}
            </VDRsITPsBlockWrapper>
          )}
          {lineJobVDRs && lineJobVDRs.length === 0 && (
            <TextWrapper>
              {libraryEmptyPlaceholder.vdrs}
            </TextWrapper>
          )}
        </StyledCollapse>
      </MultiSelectListsWrapper>
    </ClickAwayListener>
  );
};

const mapStateToProps = createStructuredSelector({
  lineJobVDRs: selectLineVDRs(),
  stationWidgetVDRs: selectStationWidgetVDRs(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addVDRToStation,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(VDRsMultiSelectGroup);
