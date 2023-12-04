import * as PropTypes from 'prop-types';

import {
  BOMsBlockWrapper,
  FilteredBoms,
  MultiSelectListsWrapper,
  StyledBOMsCollapse,
  TextWrapper,
} from './styledComponents';
import {
  DELETE_TASK_MODAL_HEADER,
  DELETE_TASK_MODAL_TEXT,
  LINEJOB_NOTIFICATIONS_TYPE,
  libraryEmptyPlaceholder
} from '../../../../../../../constants';
import {
  LeftBlock,
  StyledListItem,
  StyledSearchInput,
} from '../../styledComponents';
import React, { useEffect } from 'react';
import { areEqual, isBomDeleted } from './components/DropDownBoms/utils';
import { bindActionCreators, compose } from 'redux';
import { getChoosedLineJobBOMs, updateChoseLineJobBOMs } from '../../../../../../../actions/jobDetails';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import BOMsComponent from './components/DropDownBoms/BOMsComponent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IsCheckedItemIcon } from '../../../../../../../components/IsCheckedItemIcon/IsCheckedItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ModalDialog from '../../../../../../../components/ModalDialog';
import SearchIcon from '@material-ui/icons/Search';
import { SignalsWarningIcon } from '../../../../../../../components/SvgIcons/svgIcons';
import Typography from '@material-ui/core/Typography';
import { addBOMsToStation } from '../../../../../../../actions/supervisorJobDetails';
import { connect } from 'react-redux';
import { createBOMsWithChildsAndParent } from "../../../../../../../utils/boms";
import { isBomsWereChange } from './components/WidgetBoms/utils';
import { markNotificationsAsSupervisor } from '../../../../../../../actions/issueRevision';
import { withRouter } from 'react-router';

const BOMsMultiSelectGroup = ({
  match,
  supervisorLineBOMs,
  checkedSupervisorLineBOMs,
  getChoosedLineJobBOMs,
  updateChoseLineJobBOMs,
  openedStation,
  addBOMsToStation,
  handleAddedEntities,
  setIsStationChangesSaved,
  addedStationsBoms,
  setStationsBoms,
  initialStationBOMs,
  isAddNewStation,
  notifications,
                                markNotificationsAsSupervisor,
                                isDataLoading
}) => {
  const [isOpenCollapse, setIsOpenCollapse] = React.useState(false);
  const [valueForBOMsSearch, setValueForBOMsSearch] = React.useState('');
  const [filteredLineBoms, setFilteredLineBoms] = React.useState(supervisorLineBOMs);

  useEffect(() => {
    getChoosedLineJobBOMs(match.params.jobId);
  }, [getChoosedLineJobBOMs, match.params.jobId]);

  useEffect(() => {
    setFilteredLineBoms(supervisorLineBOMs);
  }, [supervisorLineBOMs]);
  useEffect(() => {
    if (openedStation.length > 0 || !isAddNewStation) {
      return;
    }
    getChoosedLineJobBOMs(match.params.jobId);
  }, [openedStation, isAddNewStation, getChoosedLineJobBOMs, match.params.jobId]);

  const handleOpenCollaps = () => {
    setIsOpenCollapse(!isOpenCollapse);
    setValueForBOMsSearch('');
    const readIds = notifications
      .filter(notification => notification.revisedElementType.name === LINEJOB_NOTIFICATIONS_TYPE.BOMItem)
      .map(item => item.id);
    if (readIds.length) {
      markNotificationsAsSupervisor({ items: readIds });
    }
  };
  const handleClickAway = () => {
    setIsOpenCollapse(false);
  };

  const onBomSearch = e => {
    setValueForBOMsSearch(e.target.value);
    if (e.target.value.length > 0) {
      const filteredBOMs = supervisorLineBOMs.filter(item =>
        (item.title.toUpperCase().indexOf(e.target.value.toUpperCase()) + 1)
        || (item.number.toUpperCase().indexOf(e.target.value.toUpperCase()) + 1));
      setFilteredLineBoms(filteredBOMs);
      return;
    }
    if (e.target.value.length === 0) {
      setFilteredLineBoms(supervisorLineBOMs);
    }
  };

  const handleBOMAction = (id, isCheckedForStation) => {
    const parsedBOMs = createBOMsWithChildsAndParent(supervisorLineBOMs);

    const foundedToggledBOM = parsedBOMs.find(bom => bom.id === id);
    const handledBOMsIds = [];
    let temporaryBOMS = [];

    const setHandledBOMsToTemporary = (bom) => {
      if (handledBOMsIds.includes(bom.id) === false) {
        handledBOMsIds.push(bom.id);

        temporaryBOMS = checkedSupervisorLineBOMs.map(item =>
          (handledBOMsIds.indexOf(item.id) >= 0 ? { ...item, isCheckedForStation } : item));
      }
    };

    const updateBOMsStatus = (bomItem) => {
      setHandledBOMsToTemporary(bomItem);

      const foundedBOMInTemporary = bomItem.parentId !== null && temporaryBOMS.find(bom => bom.id === bomItem.parentId);
      const parentIsChangedStatus = isCheckedForStation === foundedBOMInTemporary.isCheckedForStation;
      const changeParentStatus = (parentBOM) => {
        setHandledBOMsToTemporary(parentBOM);
        const foundedParentBOM = parsedBOMs.find(item => item.id === parentBOM.parentId);
        if (parentBOM.parentId !== null) {
          changeParentStatus(foundedParentBOM);
        }
      };

      if (bomItem.parentId !== null && !parentIsChangedStatus) {
        const foundedParentBOM = parsedBOMs.find(item => item.id === bomItem.parentId);
        if (foundedParentBOM.children.length > 1) {
          const parentChildrenStatuses = foundedParentBOM.children
            .map(bom => (!!temporaryBOMS.find(item => item.id === bom.id).isCheckedForStation).toString());
          const isStatusesAreEqual = areEqual(parentChildrenStatuses);

          if (isStatusesAreEqual && foundedParentBOM.parentId) {
            updateBOMsStatus(foundedParentBOM);
          } else if (isCheckedForStation) {
            changeParentStatus(foundedParentBOM);
          } else if (isStatusesAreEqual && foundedParentBOM.parentId === null) {
            setHandledBOMsToTemporary(foundedParentBOM);
          }
        } else if (foundedParentBOM.children.length === 1) {
          setHandledBOMsToTemporary(foundedParentBOM);
        }
      }

      if (bomItem.children && bomItem.children.length > 0) {
        bomItem.children.forEach(item => {
          const foundedChildBOM = parsedBOMs.find(bom => bom.id === item.id);
          setHandledBOMsToTemporary(item);
          if (foundedChildBOM && foundedChildBOM.children && foundedChildBOM.children.length > 0) {
            updateBOMsStatus(foundedChildBOM);
          } else {
            setHandledBOMsToTemporary(foundedChildBOM);
          }
        });
      }
    };

    if (foundedToggledBOM.parentId !== null
      || (foundedToggledBOM.children && foundedToggledBOM.children.length > 0)
    ) {
      updateBOMsStatus(foundedToggledBOM);
    } else {
      setHandledBOMsToTemporary(foundedToggledBOM);
    }

    const updatedBOMs = checkedSupervisorLineBOMs.map(item =>
      (handledBOMsIds.indexOf(item.id) >= 0 ? { ...item, isCheckedForStation } : item));

    const bomsForStation = updatedBOMs.filter(item => item.isCheckedForStation);
    updateChoseLineJobBOMs(updatedBOMs);
    const stationBOMsData = bomsForStation.map(item => (
      {
        lineJobBomId: item.id,
        bom: item,
      }
    ));

    addBOMsToStation(stationBOMsData);
    setValueForBOMsSearch('');

    if (isBomsWereChange(initialStationBOMs, stationBOMsData)) {
      handleAddedEntities();
    } else {
      setIsStationChangesSaved(true);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <MultiSelectListsWrapper>
        <StyledListItem
          button
          onClick={handleOpenCollaps}
          isOpen={isOpenCollapse}
          isDataLoading={isDataLoading}
        >
          <ListItemText primary="BILL OF MATERIALS" />
          {notifications.filter(item => item.revisedElementType.name === LINEJOB_NOTIFICATIONS_TYPE.BOMItem).length
            ? <SignalsWarningIcon color="ORANGE" />
            : null}
          {isOpenCollapse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </StyledListItem>
        <StyledBOMsCollapse in={isOpenCollapse} timeout="auto" unmountOnExit>
          <StyledSearchInput
            onChange={onBomSearch}
            disabled={supervisorLineBOMs && supervisorLineBOMs.length === 0}
            value={valueForBOMsSearch}
            placeholder="Search by BOM"
            startAdornment={(
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )}
          />
          <BOMsBlockWrapper>
            {valueForBOMsSearch.length > 0 && (filteredLineBoms && filteredLineBoms.length === 0) ? (
              <TextWrapper>
                No results
              </TextWrapper>
            )
              : (valueForBOMsSearch.length > 0
                && (
                  <FilteredBoms>
                    <ul>
                      {filteredLineBoms.map((bom, index) => (
                        <li
                          id={`${bom.title}-${index}`}
                          key={bom.title}
                        >
                          <LeftBlock
                            isChecked={
                              !isBomDeleted(bom.id, checkedSupervisorLineBOMs)
                            }
                          >
                            <IsCheckedItemIcon isHidden={!isBomDeleted(bom.id, checkedSupervisorLineBOMs)} />
                            <Typography
                              align="left"
                              variant="body2"
                              onClick={() => (openedStation.length > 0)
                                && handleBOMAction(bom.id, !isBomDeleted(bom.id, checkedSupervisorLineBOMs))}
                            >
                              {`${bom.number} - ${bom.title}`}
                            </Typography>
                            {notifications.filter(msg => msg.revisedElementId === bom.id).length
                              ? <SignalsWarningIcon width="24" height="24" color="ORANGE" />
                              : null}
                          </LeftBlock>
                        </li>
                      ))}
                    </ul>
                  </FilteredBoms>
                )
              )}
            {valueForBOMsSearch.length === 0 && (
              <div>
                {supervisorLineBOMs && supervisorLineBOMs.length === 0 ? (
                  <TextWrapper>
                    {libraryEmptyPlaceholder.boms}
                  </TextWrapper>
                )
                  : (
                    <BOMsComponent
                      handleBOMAction={handleBOMAction}
                      boms={supervisorLineBOMs}
                      lineStations
                      lineJobId={match.params.jobId}
                      checkedBoms={checkedSupervisorLineBOMs}
                      updateBoms={updateChoseLineJobBOMs}
                      addToStation={addBOMsToStation}
                      openedStation={openedStation}
                      isItemWithAnnotation={false}
                      setIsStationChangesSaved={setIsStationChangesSaved}
                      handleAddedEntities={handleAddedEntities}
                      addedStationsBoms={addedStationsBoms}
                      setStationsBoms={setStationsBoms}
                      initialStationBOMs={initialStationBOMs}
                      isAddNewStation={isAddNewStation}
                    />
                  )}
              </div>
            )}
          </BOMsBlockWrapper>

        </StyledBOMsCollapse>

        <ModalDialog
          open={false}
          buttonsNames={{
            confirmButtonText: 'REMOVE',
            cancelButtonText: 'CANCEL',
          }}
          headerText={DELETE_TASK_MODAL_HEADER}
          bodyText={DELETE_TASK_MODAL_TEXT}
          onClickCancel={() => { }}
          onClickConfirm={() => { }}
        />
      </MultiSelectListsWrapper>
    </ClickAwayListener>
  );
};

BOMsMultiSelectGroup.propTypes = {
  match: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
  supervisorLineBOMs: state.supervisorJobDetails.supervisorLineBOMs,
  addedStationsBoms: state.supervisorJobDetails.addedStationsBoms,
  setStationsBoms: state.supervisorJobDetails.setStationsBoms,
  checkedSupervisorLineBOMs: state.supervisorJobDetails.checkedSupervisorLineBOMs,
  lineJobStations: state.supervisorJobDetails.lineJobStations,
  lineStations: state.supervisorJobDetails.lineStations,
  initialStationBOMs: state.supervisorJobDetails.initialStationBOMs,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getChoosedLineJobBOMs,
  updateChoseLineJobBOMs,
  addBOMsToStation,
  markNotificationsAsSupervisor
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(BOMsMultiSelectGroup);
