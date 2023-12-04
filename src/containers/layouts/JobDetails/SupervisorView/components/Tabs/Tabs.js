import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LayersIcon from '@material-ui/icons/Layers';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { markNotificationsAsSupervisor } from '../../../../../../actions/issueRevision';
import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import ModalDialog from '../../../../../../components/ModalDialog';
import { SignalsWarningIcon } from '../../../../../../components/SvgIcons/svgIcons';
import {
  BUTTONS_TEXT,
  DELETE_NOTES_MODAL_HEADER,
  DELETE_NOTES_MODAL_TEXT,
  LINEJOB_NOTIFICATIONS_TYPE,
  MULTI_SELECT_GROUP_TYPES, STATION_NOTIFICATIONS_TYPE,
  UNSAVED_NOTES_MODAL_HEADER,
  UNSAVED_NOTES_MODAL_TEXT,
} from '../../../../../../constants';
import BOMsMultiSelectGroup from '../BOMWidget/BOMsMultiSelectGroup/BOMsMultiSelectGroup';
import UnitChecksMultiSelectGroup from '../ChecksWidget/components/UnitCheckMultiSelectGroup/ChecksMultiSelectGroup';
import ITPsMultiSelectGroup from '../ITPWidget/components/ITPsMultiSelectGroup/ITPsMultiSelectGroup';
import MultiSelectGroup from '../MultiSelectGroup/MultiSelectGroup';
import TasksMultiSelectGroup from '../TasksWidget/TasksMultiSelectGroup/TasksMultiSelectGroup';
import VDRsMultiSelectGroup from '../VDRWidget/components/VDRsMultiSelectGroup/VDRsMultiSelectGroup';
import {
  AddNotesPopUpFooter,
  AddNotesPopUpWrapper,
  AddNotesPopUpWrapperHeader,
  IconsWrapper,
  NotesArea,
  NotesContentWrapper,
  NotesFooter,
  Panel,
  SideBarWidgets,
  StyledCloseIcon,
  StyledNotesTitle,
  StyledTextArea,
  StyledTypography,
  TabButton,
  TabsGroup,
  TabsWrapper,
} from './styledComponents';
import { filteredNotificationsForStation } from "../../../../../../utils";

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Panel
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        children
      )}
    </Panel>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SimpleTabs = ({
  isBack,
  addedNotes,
  updateLineJobNotes,
  updateNotes,
  id,
  setIsStationChangesSaved,
  handleAddedEntities,
  handleUnsavedChangesInNotes,
  openedStation,
  isDataLoading,
  isAddNewStation,
  isUnsavedNotesDialogOpen,
  setIsUnsavedNotesDialogOpen,
  notifications,
  markNotificationsAsSupervisor,
}) => {
  const [notes, setNotes] = useState('');
  const [value, setValue] = useState(0);
  const [inputedNotes, setInputedNotes] = useState('');
  const [isEditNotesPopUpOpen, setIsEditNotesPopUpOpen] = useState(false);
  const [isOpenDeleteNotesDialog, setIsOpenDeleteNotesDialog] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (addedNotes) {
      setNotes(addedNotes);
    }
  }, [addedNotes]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeAddEditNotesPopUp = async () => {
    if (notes === inputedNotes) {
      setIsEditNotesPopUpOpen(false);
      handleUnsavedChangesInNotes(true);
    } else {
      setIsUnsavedNotesDialogOpen(false);
    }
  };

  const closeUnsavedModal = () => {
    if (isBack) {
      window.history.back();
    }
    setInputedNotes('');
    handleUnsavedChangesInNotes(true);
    setIsEditNotesPopUpOpen(false);
    setIsUnsavedNotesDialogOpen(false);
  };

  const onChangeNotes = (e) => {
    updateLineJobNotes(e.target.value);
    setInputedNotes(e.target.value);
    if (e.target.value === notes) {
      handleUnsavedChangesInNotes(true);
    } else {
      handleUnsavedChangesInNotes(false);
    }
  };

  const saveNotes = () => {
    if (isUnsavedNotesDialogOpen) {
      setIsUnsavedNotesDialogOpen(false);
    }
    if (addedNotes === inputedNotes) {
      handleUnsavedChangesInNotes(true);
    }
    setIsEditNotesPopUpOpen(false);
    setNotes(inputedNotes);
    updateLineJobNotes(inputedNotes);
    updateNotes(id, { id, notes: inputedNotes });
    handleUnsavedChangesInNotes(true);
    if (isBack) {
      window.history.back();
    }
    setInputedNotes('');
  };

  const addNotes = () => {
    setInputedNotes(notes);
    setIsEditNotesPopUpOpen(true);
    setModalPosition({ x: 0, y: 0 });
  };

  const deleteNotes = () => {
    setNotes('');
    setInputedNotes('');
    updateLineJobNotes('');
    setIsEditNotesPopUpOpen(false);
    setIsOpenDeleteNotesDialog(false);
    handleUnsavedChangesInNotes(true);
    updateNotes(id, { id, notes: '' });
  };

  const onDragStop = (e, position) => {
    const { x, y } = position;
    setModalPosition({ x, y });
  };

  const useStyles = makeStyles({
    indicator: {
      backgroundColor: 'transparent',
    },
  });
  const classes = useStyles();

  const markNotesInLibrary = (data) => {
    const filteredNotesNotificationsIDs = data.filter((item) =>
      item.revisedElementType.name === STATION_NOTIFICATIONS_TYPE.libraryNotes).map(item => item.id);
    if (filteredNotesNotificationsIDs.length) {
      markNotificationsAsSupervisor({ items: filteredNotesNotificationsIDs });
    }

  };

  return (
    <>
      <SideBarWidgets>
        <TabPanel value={value} index={0}>
          <StyledTypography variant="h2">LIBRARY</StyledTypography>
          <MultiSelectGroup
            isDataLoading={isDataLoading}
            openedStation={openedStation}
            handleAddedEntities={handleAddedEntities}
            setIsStationChangesSaved={setIsStationChangesSaved}
            isAddNewStation={isAddNewStation}
            multiSelectType={MULTI_SELECT_GROUP_TYPES.DRW}
            notifications={filteredNotificationsForStation(notifications, id)}
            notificationType={LINEJOB_NOTIFICATIONS_TYPE.Drawing}
          />
          <BOMsMultiSelectGroup
            isAddNewStation={isAddNewStation}
            isDataLoading={isDataLoading}
            openedStation={openedStation}
            handleAddedEntities={handleAddedEntities}
            notifications={filteredNotificationsForStation(notifications, id)}
          />
          <VDRsMultiSelectGroup
            openedStation={openedStation}
            isDataLoading={isDataLoading}
            handleAddedEntities={handleAddedEntities}
          />
          <ITPsMultiSelectGroup
            isDataLoading={isDataLoading}
            openedStation={openedStation}
            handleAddedEntities={handleAddedEntities}
            notifications={filteredNotificationsForStation(notifications, id)}
          />
          <MultiSelectGroup
            openedStation={openedStation}
            isDataLoading={isDataLoading}
            handleAddedEntities={handleAddedEntities}
            setIsStationChangesSaved={setIsStationChangesSaved}
            isAddNewStation={isAddNewStation}
            multiSelectType={MULTI_SELECT_GROUP_TYPES.DOC}
            notifications={filteredNotificationsForStation(notifications, id)}
            notificationType={LINEJOB_NOTIFICATIONS_TYPE.Document}
          />
          <TasksMultiSelectGroup
            isAddNewStation={isAddNewStation}
            isDataLoading={isDataLoading}
            openedStation={openedStation}
            handleAddedEntities={handleAddedEntities}
            setIsStationChangesSaved={setIsStationChangesSaved}
          />
          <UnitChecksMultiSelectGroup
            isDataLoading={isDataLoading}
            openedStation={openedStation}
            handleAddedEntities={handleAddedEntities}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StyledTypography variant="h2">NOTES</StyledTypography>
          <NotesArea style={{ border: '1px solid #425a70' }}>
            <NotesContentWrapper>
              {notes}
            </NotesContentWrapper>
          </NotesArea>
          <NotesFooter>
            {notes.length > 0 && (
              <ContainedButton
                variant="contained"
                color="primary"
                colorType="classic"
                text={BUTTONS_TEXT.edit}
                onClick={() => addNotes()}
              />
            )}
          </NotesFooter>
          <Draggable
            position={modalPosition}
            onStop={onDragStop}
            handle=".handle"
          >
            <Fade in={isEditNotesPopUpOpen}>
              <AddNotesPopUpWrapper>
                <AddNotesPopUpWrapperHeader className="handle">
                  <StyledNotesTitle>Add notes</StyledNotesTitle>
                  <StyledCloseIcon onClick={closeAddEditNotesPopUp} />
                </AddNotesPopUpWrapperHeader>
                <StyledTextArea
                  multiline
                  autoFocus
                  value={inputedNotes}
                  variant="outlined"
                  rowsMax={200}
                  onChange={onChangeNotes}
                  placeholder="Enter notes..."
                />
                <AddNotesPopUpFooter>
                  <ContainedButton
                    variant="contained"
                    color="secondary"
                    colorType="white"
                    ishidden={!isEditNotesPopUpOpen}
                    text={BUTTONS_TEXT.delete}
                    onClick={() => setIsOpenDeleteNotesDialog(true)}
                  />
                  <ContainedButton
                    variant="contained"
                    color="primary"
                    colorType="classic"
                    text={BUTTONS_TEXT.add}
                    onClick={() => saveNotes()}
                  />
                </AddNotesPopUpFooter>
              </AddNotesPopUpWrapper>
            </Fade>
          </Draggable>
          <ModalDialog
            open={isOpenDeleteNotesDialog}
            buttonsNames={{
              confirmButtonText: 'REMOVE',
              cancelButtonText: 'CANCEL',
            }}
            onClose={() => setIsOpenDeleteNotesDialog(false)}
            headerText={DELETE_NOTES_MODAL_HEADER}
            bodyText={DELETE_NOTES_MODAL_TEXT}
            onClickCancel={() => setIsOpenDeleteNotesDialog(false)}
            onClickConfirm={deleteNotes}
          />
          <ModalDialog
            open={isUnsavedNotesDialogOpen}
            buttonsNames={{
              confirmButtonText: 'SAVE',
              cancelButtonText: 'DISCARD',
            }}
            headerText={UNSAVED_NOTES_MODAL_HEADER}
            bodyText={UNSAVED_NOTES_MODAL_TEXT}
            onClickCancel={closeUnsavedModal}
            onClickConfirm={saveNotes}
          />
        </TabPanel>
      </SideBarWidgets>
      <TabsWrapper position="static">
        <TabsGroup
          classes={{
            indicator: classes.indicator,
          }}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <TabButton icon={<LayersIcon />} label="LIBRARY" {...a11yProps(0)} />
          <TabButton
            onClick={() => markNotesInLibrary(notifications)}
            icon={(
              <IconsWrapper>
                <AssignmentIcon />
                {notifications &&
                filteredNotificationsForStation(notifications, id).filter(item =>
                  item.revisedElementType.name === STATION_NOTIFICATIONS_TYPE.libraryNotes).length
                  ? <SignalsWarningIcon width="24" height="24" color="ORANGE" />
                  : null}
              </IconsWrapper>
            )}
            label="NOTES"
            {...a11yProps(1)}
          />
        </TabsGroup>
      </TabsWrapper>
    </>
  );
};

SimpleTabs.propTypes = {
  notifications: PropTypes.instanceOf(Array),
};

const mapStateToProps = ({ issueRevision: { lineJobNotifications } }) => ({
  notifications: lineJobNotifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  markNotificationsAsSupervisor,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTabs);
