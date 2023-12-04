import {
  BUTTONS_TEXT,
  CREATE_UNIT_CHECKS_MODAL_HEADER,
  DELETE_UNIT_CHECK_MODAL_HEADER,
  DELETE_UNIT_CHECK_MODAL_TEXT,
  UPDATE_UNIT_CHECKS_HEADER,
  libraryEmptyPlaceholder,
} from '../../../../../../../../constants';
import {
  ButtonWrapper,
  MultiSelectListsWrapper,
  NoteIconWrapper,
  TextWrapper,
  UnitChecksBlockWrapper,
} from './styledComponents';
import {
  DropDownItemText,
  StyledCollapse,
  StyledListItem,
  StyledMenuItem,
} from '../../../styledComponents';
import {
  addNewUnitCheck,
  addUnitCheckToStation,
  deleteUnitCheck,
  getLineJobStationUnitChecks,
  getLineJobStationUnitChecksWithoutSettingToRedux,
  getLineUnitChecks,
  setIsStationHasUnitChecks,
  updateUnitCheck,
  updateWidgetUnitChecks,
} from '../../../../../../../../actions/unitChecks';
import { bindActionCreators, compose } from 'redux';
import {
  getLineJobID,
  getLineJobStationBOMs,
  getLineJobStationDocuments,
  getLineJobStationTasks,
  getLineJobStations,
  getLineJobStationsWithDetails,
  setBOMsToStation,
  setLineJobStationTasks,
} from '../../../../../../../../actions/supervisorJobDetails';
import {
  selectLineUnitChecks,
  selectStationWidgetUnitChecks,
} from '../../../../../../../../selectors/unitChecks';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ContainedButton from '../../../../../../../../components/Buttons/ContainedButton';
import CreateAndEditUnitCheckModalDialog from '../CreateUnitChecksModalView/CreateChecksModalView';
import { LIBRARY_TABS } from '../../../../../../../../constants/labelsNaming';
import ListItemText from '@material-ui/core/ListItemText';
import ModalDialog from '../../../../../../../../components/ModalDialog';
import NoteIcon from '../../../../../../../../img/iconNotes-small.svg';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { overrideWidgetItemsSortIndex } from '../../../../../../../../utils/jobDetailsFunctions';
import { withRouter } from 'react-router';

const isUnitCheckChose = (item, unitChecks) => {
  const isStationUnitCheck = unitChecks.some(unitCheck => unitCheck.lineJobUnitCheckId === item.id);
  const isAddedStationUnitCheck = unitChecks.some(unitCheck => unitCheck.id === item.id);
  return isStationUnitCheck || isAddedStationUnitCheck;
};

const isAllUnitChecksAdded = (allUnitChecks, stationUnitChecks) => {
  const addedUnitChecksIds = stationUnitChecks.map(item => item.lineJobUnitCheckId || item.id);
  return allUnitChecks.every(item => addedUnitChecksIds.includes(item.id));
};

const UnitChecksMultiSelectGroup = ({
  openedStation,
  match,
  lineJobUnitChecks,
  handleAddedEntities,
  getLineJobStations,
  getLineJobStationsWithDetails,
  stationWidgetUnitChecks,
  deleteUnitCheck,
  addNewUnitCheck,
  addUnitCheckToStation,
  getLineUnitChecks,
  updateUnitCheck,
  updateWidgetUnitChecks,
  getLineJobStationUnitChecksWithoutSettingToRedux,
  setIsStationHasUnitChecks,
  getLineJobStationDocuments,
  getLineJobID,
  getLineJobStationTasks,
  setLineJobStationTasks,
  getLineJobStationBOMs,
  setBOMsToStation,
  isDataLoading,
}) => {
  const [unitCheckDescription, setUnitCheckDescription] = React.useState('');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isOpenCollapse, setIsOpenCollapse] = React.useState(false);
  const [selectedUnitCheckId, setSelectedUnitCheckId] = React.useState('');

  const onChangeUnitCheckDescription = (e) => {
    setUnitCheckDescription(e.target.value);
  };

  const handleOpenCollaps = () => {
    setIsOpenCollapse(!isOpenCollapse);
  };
  const handleClickAway = () => {
    setIsOpenCollapse(false);
    setUnitCheckDescription('');
  };

  const addUnitCheck = (id) => {
    if (openedStation.length === 0) {
      return;
    }
    const foundUnitCheck = lineJobUnitChecks.find(item => (item.id === id));
    addUnitCheckToStation(
      {
        widgetUnitChecks: [...stationWidgetUnitChecks,
          { ...foundUnitCheck, sortIndex: stationWidgetUnitChecks.length + 1 },
        ],
      },
    );
    handleAddedEntities();
  };

  const addAllUnitChecks = (e) => {
    e.stopPropagation();
    if (openedStation.length === 0) {
      return;
    }
    const stationWidgetUnitChecksIds = [
      ...stationWidgetUnitChecks.map(item => item.lineJobUnitCheckId || item.id)
    ];
    const filterNotAddedUnitChecks = lineJobUnitChecks.filter(item => !stationWidgetUnitChecksIds.includes(item.id));

    const extendedFilterNotAddedUnitChecks = filterNotAddedUnitChecks.map((item, i) =>
      ({ ...item, sortIndex: stationWidgetUnitChecks.length + i }));
    updateWidgetUnitChecks([...stationWidgetUnitChecks, ...extendedFilterNotAddedUnitChecks]);
    handleAddedEntities();
  };


  const onClickAddNewUnitCheck = () => {
    setIsAddModalOpen(true);
  };

  const closeAddEditNewUnitCheckModal = () => {
    setIsAddModalOpen(false);
    setSelectedUnitCheckId('');
    setUnitCheckDescription('');
  };
  const onCloseDeleteModal = () => {
    setSelectedUnitCheckId('');
    setUnitCheckDescription('');
    setIsDeleteModalOpen(false);
  };
  const confirmAddNewUnitCheckModal = async (e) => {
    e.preventDefault();
    const body = {
      lineJobId: match.params.jobId,
      text: unitCheckDescription,
    };
    await addNewUnitCheck(body);
    getLineUnitChecks(match.params.jobId);
    setUnitCheckDescription('');
    setIsAddModalOpen(false);
  };

  const openEditModal = (id) => {
    setIsAddModalOpen(true);
    setSelectedUnitCheckId(id);
    const foundedUnitCheckToEdit = lineJobUnitChecks.find(item => item.id === id);
    setUnitCheckDescription(foundedUnitCheckToEdit.text);
  };

  const onDeleteUnitCheck = async (id) => {
    await deleteUnitCheck(id);
    getLineUnitChecks(match.params.jobId);

    if (openedStation.length > 0) {
      const foundDeletedUnitCheckInWidget = stationWidgetUnitChecks.find(unitCheck =>
        unitCheck.id === id || unitCheck.lineJobUnitCheckId === id);
      if (foundDeletedUnitCheckInWidget) {
        const updatedWidgetUnitChecks = overrideWidgetItemsSortIndex(stationWidgetUnitChecks.filter(item => (
          item.id !== foundDeletedUnitCheckInWidget.id
        )));
        handleAddedEntities();
        updateWidgetUnitChecks(updatedWidgetUnitChecks);
      }
    }

    getLineJobStationsWithDetails(match.params.jobId);
    // getLineJobStations(match.params.jobId).then(response => response && response.data
    //   .forEach(station => {
    //     getLineJobStationDocuments(station.id)
    //       .then(response => response && getLineJobID(response.data, station.id));
    //     getLineJobStationUnitChecksWithoutSettingToRedux(station.id)
    //       .then(response => response
    //         && setIsStationHasUnitChecks(response.data.length > 1, station.id));
    //     getLineJobStationTasks(station.id)
    //       .then(response => response && setLineJobStationTasks(response.data, station.id));
    //     getLineJobStationBOMs(station.id)
    //       .then(response => response && setBOMsToStation(response.data));
    //   }));
    setSelectedUnitCheckId('');
    setUnitCheckDescription('');
    setIsDeleteModalOpen(false);
  };

  const openDeleteDialog = async (id) => {
    setIsAddModalOpen(false);
    setIsDeleteModalOpen(true);
    setSelectedUnitCheckId(id);
  };

  const onUpdateUnitCheckData = async (id, e) => {
    e.preventDefault();
    const body = {
      id,
      text: unitCheckDescription,
    };
    await updateUnitCheck(body, id);
    setIsAddModalOpen(false);
    getLineUnitChecks(match.params.jobId).then(response => {
      if (stationWidgetUnitChecks.length > 0) {
        const foundUpdatedUnitCheck = response && response.data.find(unitCheck =>
          unitCheck.id === id);
        const updatedAddedUnitChecks = stationWidgetUnitChecks.map(item => (
          foundUpdatedUnitCheck
          && (item.id === foundUpdatedUnitCheck.id || item.lineJobUnitCheckId === foundUpdatedUnitCheck.id)
            ? { ...item, text: foundUpdatedUnitCheck.text } : item
        ));
        updateWidgetUnitChecks(updatedAddedUnitChecks);
      }
    });
    setSelectedUnitCheckId('');
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <MultiSelectListsWrapper>
        <StyledListItem
          button
          isDataLoading={isDataLoading}
          onClick={!isDataLoading ? handleOpenCollaps : null}
          isOpen={isOpenCollapse}
        >
          <ListItemText primary={LIBRARY_TABS.unitChecks} />
          {isOpenCollapse && (
          <ContainedButton
            id="add-all-checks"
            variant="contained"
            color="primary"
            colorType="classic"
            disabled={
              !openedStation.length
              || isAllUnitChecksAdded(lineJobUnitChecks, stationWidgetUnitChecks)
            }
            onClick={addAllUnitChecks}
            text={BUTTONS_TEXT.addAll}
          />
          )}
          {isOpenCollapse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </StyledListItem>
        <StyledCollapse in={isOpenCollapse} timeout="auto" unmountOnExit>
          {lineJobUnitChecks.length > 0 && (
            <UnitChecksBlockWrapper>
              {lineJobUnitChecks.map((item) => (
                <StyledMenuItem
                  isChecked={isUnitCheckChose(item, stationWidgetUnitChecks)}
                  key={item.id}
                  id={item.id}
                >
                  <NoteIconWrapper onClick={() => openEditModal(item.id)}>
                    <img alt="noteIcon" src={NoteIcon} />
                  </NoteIconWrapper>
                  <DropDownItemText onClick={() =>
                    !isUnitCheckChose(item, stationWidgetUnitChecks)
                    && addUnitCheck(item.id)}
                  >
                    {item.text}
                  </DropDownItemText>
                </StyledMenuItem>
              ))}
            </UnitChecksBlockWrapper>
          )}
          <ButtonWrapper>
            <ContainedButton
              variant="contained"
              color="primary"
              colorType="classic"
              onClick={onClickAddNewUnitCheck}
              text={BUTTONS_TEXT.createNew}
            />
          </ButtonWrapper>
          {lineJobUnitChecks && lineJobUnitChecks.length === 0 && (
            <TextWrapper>
              {libraryEmptyPlaceholder.checks}
            </TextWrapper>
          )}
        </StyledCollapse>

        <ModalDialog
          open={isDeleteModalOpen}
          buttonsNames={{
            confirmButtonText: BUTTONS_TEXT.remove,
            cancelButtonText: BUTTONS_TEXT.cancel,
          }}
          headerText={DELETE_UNIT_CHECK_MODAL_HEADER}
          bodyText={DELETE_UNIT_CHECK_MODAL_TEXT}
          onClickCancel={onCloseDeleteModal}
          onClickConfirm={() => onDeleteUnitCheck(selectedUnitCheckId)}
        />

        <CreateAndEditUnitCheckModalDialog
          open={isAddModalOpen}
          buttonsNames={selectedUnitCheckId ? {
            confirmButtonText: BUTTONS_TEXT.update,
            cancelButtonText: BUTTONS_TEXT.delete,
          }
            : {
              confirmButtonText: BUTTONS_TEXT.create,
              cancelButtonText: BUTTONS_TEXT.cancel,
            }}
          onChangeUnitCheckDescription={onChangeUnitCheckDescription}
          unitCheckDescription={unitCheckDescription}
          onClose={closeAddEditNewUnitCheckModal}
          selectedUnitCheckId={selectedUnitCheckId}
          headerText={selectedUnitCheckId ? UPDATE_UNIT_CHECKS_HEADER : CREATE_UNIT_CHECKS_MODAL_HEADER}
          onClickCancel={() =>
            (isAddModalOpen && !!selectedUnitCheckId
              ? openDeleteDialog(selectedUnitCheckId)
              : closeAddEditNewUnitCheckModal())}
          onClickConfirm={(e) =>
            (isAddModalOpen && !!selectedUnitCheckId
              ? onUpdateUnitCheckData(selectedUnitCheckId, e)
              : confirmAddNewUnitCheckModal(e))}
        />
      </MultiSelectListsWrapper>
    </ClickAwayListener>
  );
};

const mapStateToProps = createStructuredSelector({
  lineJobUnitChecks: selectLineUnitChecks(),
  stationWidgetUnitChecks: selectStationWidgetUnitChecks(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUnitCheck,
  deleteUnitCheck,
  addNewUnitCheck,
  getLineJobStations,
  getLineJobStationsWithDetails,
  addUnitCheckToStation,
  getLineUnitChecks,
  getLineJobStationUnitChecks,
  updateWidgetUnitChecks,
  getLineJobStationUnitChecksWithoutSettingToRedux,
  setIsStationHasUnitChecks,
  getLineJobStationDocuments,
  getLineJobID,
  getLineJobStationTasks,
  setLineJobStationTasks,
  getLineJobStationBOMs,
  setBOMsToStation,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(UnitChecksMultiSelectGroup);
