import * as PropTypes from 'prop-types';

import {
  BUTTONS_TEXT,
  CREATE_TASK_MODAL_HEADER,
  DELETE_TASK_MODAL_HEADER,
  DELETE_TASK_MODAL_TEXT,
  UPDATE_TASK_MODAL_HEADER,
  libraryEmptyPlaceholder,
} from '../../../../../../../constants';
import {
  ButtonWrapper,
  ItemText,
  MultiSelectListsWrapper,
  StyledMenuItem,
  TaskDuration,
  TaskNoteWrapper,
  TaskType,
  TasksBlockWrapper,
  TextWrapper,
} from './styledComponents';
import {StyledCollapse, StyledListItem} from '../../styledComponents';
import {
  addTasksToStation,
  clearStationTasks,
  createNewTask,
  deleteTask,
  getLineJobID,
  getLineJobStationBOMs,
  getLineJobStationDocuments,
  getLineJobStationTasks,
  getLineJobStations,
  getLineJobStationsWithDetails,
  getLineJobTasks,
  removeTasksFromStaton,
  setBOMsToStation,
  setLineJobStationTasks,
  updateLineJobStationTasks,
  updateLineTasks,
  updateStationTasks,
  updateTask,
} from '../../../../../../../actions/supervisorJobDetails';
import { bindActionCreators, compose } from 'redux';
import {
  getLineJobStationUnitChecksWithoutSettingToRedux,
  setIsStationHasUnitChecks,
} from '../../../../../../../actions/unitChecks';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ContainedButton from '../../../../../../../components/Buttons/ContainedButton';
import CreateTaskModalDialog from '../CreateTaskModalView/CreateTaskModalView';
import ListItemText from '@material-ui/core/ListItemText';
import ModalDialog from '../../../../../../../components/ModalDialog';
import NoteIcon from '../../../../../../../img/iconNotes-small.svg';
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import sortBy from 'lodash/sortBy';
import { withRouter } from 'react-router';

const isTaskChose = (task, choosedTasks, savedTasks) => {
  const isSavedTasksIncludesChecked = savedTasks.map(item => item.lineJobTaskId).includes(task.id);
  const findedTaskChecked = choosedTasks.length > 0 && choosedTasks.find(item => item.id === task.id);
  return isSavedTasksIncludesChecked || (findedTaskChecked && findedTaskChecked.isChecked);
};

const TasksMultiSelectGroup = ({
  tasks,
  openedStation,
  match,
  getLineJobTasks,
  addTasksToStation,
  getLineJobStationTasks,
  setIsStationChangesSaved,
  handleAddedEntities,
  createNewTask,
  updateTask,
  deleteTask,
  lineJobStationTasks,
  lineJobStations,
  clearStationTasks,
  stationTasks,
  updateLineTasks,
  updateStationTasks,
  removeTasksFromStaton,
  getLineJobStations,
  getLineJobStationsWithDetails,
  getLineJobStationDocuments,
  getLineJobID,
  getLineJobStationUnitChecksWithoutSettingToRedux,
  setIsStationHasUnitChecks,
  setLineJobStationTasks,
  getLineJobStationBOMs,
  setBOMsToStation,
  isDataLoading,
}) => {
  const [taskAdditionalData, setTaskAdditionalData] = React.useState({ taskType: 'operation' });
  const [isAddNewTaskModalOpen, setIsAddNewTaskModalOpen] = React.useState(false);
  const [isOpenCollapse, setIsOpenCollapse] = React.useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = React.useState(false);
  const [idTaskToDelete, setIdTaskToDelete] = React.useState({});

  const onChangeTaskDescription = (e) => {
    setTaskAdditionalData({ ...taskAdditionalData, text: e.target.value });
  };

  const onDurationChange = (e) => {
    e.preventDefault();
    if ((!isNaN(e.target.value) && e.target.value > 0) || e.target.value === '') {
      const value = e.target.value.split('.').join('');
      setTaskAdditionalData({ ...taskAdditionalData, estimated: value });
    }
  };

  const onAverageChange = (e) => {
    e.preventDefault();
    if ((!isNaN(e.target.value) && e.target.value > 0) || e.target.value === '') {
      const value = e.target.value.split('.').join('');
      setTaskAdditionalData({ ...taskAdditionalData, historical: value });
    }
  };

  const onIncrement = (inputName) => {
    let inputValue = taskAdditionalData[inputName] ? +taskAdditionalData[inputName] : 0;
    inputValue++;
    if (inputValue > 0) {
      setTaskAdditionalData({ ...taskAdditionalData, [inputName]: inputValue });
    }
  };
  const onDecrement = (inputName) => {
    let inputValue = taskAdditionalData[inputName] ? +taskAdditionalData[inputName] : 0;
    inputValue--;
    if (inputValue > 0) {
      setTaskAdditionalData({ ...taskAdditionalData, [inputName]: inputValue });
    }
  };

  const onFixtureChange = (e) => {
    setTaskAdditionalData({ ...taskAdditionalData, fixture: e.target.value });
  };

  const changeTaskTypeRadio = (e) => {
    setTaskAdditionalData({ ...taskAdditionalData, taskType: e.target.value });
  };
  const handleOpenCollaps = () => {
    setIsOpenCollapse(!isOpenCollapse);
  };
  const handleClickAway = () => {
    setIsOpenCollapse(false);
  };

  const addTasks = (id) => {
    if (openedStation.length === 0) {
      return;
    }

    const updatedList = tasks.map(item => (item.id === id
      ? { ...item, isChecked: !item.isChecked, addedPosition: +moment() }
      : item));
    addTasksToStation({
      stationTasks: sortBy(updatedList.filter(item => item.isChecked), 'addedPosition'),
      lineTasks: updatedList,
      id: tasks.find(item => item.id === id) && tasks.find(item => item.id === id).id,
    });
    handleAddedEntities();
  };

  const onClickAddNewTask = () => {
    setIsAddNewTaskModalOpen(true);
  };

  const closeAddEditNewTaskModal = () => {
    setIsAddNewTaskModalOpen(false);
    setIsEditTaskModalOpen(false);
    setTaskAdditionalData({ taskType: 'operation' });
  };
  const confirmAddNewTaskModal = async (e) => {
    e.preventDefault();
    const taskEnumType = taskAdditionalData.taskType === 'operation' ? 1 : 2;
    const body = {
      lineJobId: match.params.jobId,
      taskType: taskEnumType,
      text: taskAdditionalData.text,
      estimated: taskAdditionalData.estimated,
      historical: taskAdditionalData.historical,
      fixture: taskAdditionalData.fixture,
    };
    await createNewTask(body);
    const checkedTasks = stationTasks.length > 0 && stationTasks
      .filter(item => item.isChecked && item.id).map(task => task.id);

    getLineJobTasks(match.params.jobId).then(
      response => {
        if (checkedTasks) {
          const data = response && response.data;
          const updatedTasks = data.map(item => (
            checkedTasks.includes(item.id) ? { ...item, isChecked: true } : item
          ));
          updateLineTasks(updatedTasks);
        }
      },
    );

    setIsAddNewTaskModalOpen(false);
    setTaskAdditionalData({ taskType: 'operation' });
  };

  const openEditModal = (id) => {
    setIsEditTaskModalOpen(true);
    const foundedTaskToEdit = tasks.find(item => item.id === id);
    const taskData = {
      editedTaskId: id,
      taskType: foundedTaskToEdit.taskType.name.toLowerCase(),
      text: foundedTaskToEdit.text,
      estimated: foundedTaskToEdit.estimated,
      historical: foundedTaskToEdit.historical,
      fixture: foundedTaskToEdit.fixture,
    };
    setTaskAdditionalData(taskData);
  };

  const onDeleteTask = async (id) => {
    await deleteTask(id);
    const foundLineTaskToDelete = tasks.find(task => task.id === id);
    const foundLineJobStation = lineJobStationTasks.find(task => task.lineJobTaskId === id);
    const filteredLineJobStationTasks = lineJobStationTasks.filter(task => task.lineJobTaskId !== id);
    if (lineJobStationTasks.length > filteredLineJobStationTasks.length) {
      removeTasksFromStaton({
        lineJobStationTasks: filteredLineJobStationTasks,
        id,
      });
    }
    setTaskAdditionalData({ taskType: 'operation' });
    await getLineJobTasks(match.params.jobId);
    const filteredStationTasks = stationTasks.filter(task => task.text !== foundLineTaskToDelete.text);
    if (!foundLineJobStation) {
      setIsStationChangesSaved(true);
    }
    updateStationTasks(filteredStationTasks);
    setIdTaskToDelete({});

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
  };

  const openDeleteDialog = async (id) => {
    setIsEditTaskModalOpen(false);
    setIdTaskToDelete({ id });
  };

  const onUpdateTaskData = async (id, e) => {
    e.preventDefault();
    const taskEnumType = taskAdditionalData.taskType === 'operation' ? 1 : 2;
    const body = {
      id,
      lineJobId: match.params.jobId,
      taskType: taskEnumType,
      text: taskAdditionalData.text,
      estimated: taskAdditionalData.estimated,
      historical: taskAdditionalData.historical,
      fixture: taskAdditionalData.fixture,
    };
    await updateTask(body, id).then(clearStationTasks());
    setTaskAdditionalData({ taskType: 'operation' });
    setIsEditTaskModalOpen(false);
    lineJobStations.forEach(station =>
      getLineJobStationTasks(station.id));


    getLineJobTasks(match.params.jobId).then(response => {
      const foundUpdatedTask = response.data.find(task => task.id === id);

      const updatedStationTasks = stationTasks.map(item => (
        foundUpdatedTask && item.id === foundUpdatedTask.id ? { ...foundUpdatedTask, isChecked: true } : item
      ));
      updateStationTasks(updatedStationTasks);
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <MultiSelectListsWrapper>
        <StyledListItem
          button
          isDataLoading={isDataLoading}
          onClick={handleOpenCollaps}
          isOpen={isOpenCollapse}
        >
          <ListItemText primary="TASKS" />
          {isOpenCollapse ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </StyledListItem>
        <StyledCollapse in={isOpenCollapse} timeout="auto" unmountOnExit>
          {tasks.length > 0 && (
            <TasksBlockWrapper>
              {tasks.map((item) => (
                <StyledMenuItem
                  isChecked={isTaskChose(item, stationTasks, lineJobStationTasks)}
                  key={item.id}
                  id={item.id}
                >
                  <TaskNoteWrapper onClick={() => openEditModal(item.id)}>
                    <img alt="noteIcon" src={NoteIcon} />
                  </TaskNoteWrapper>
                  <ItemText onClick={() =>
                    !isTaskChose(item, stationTasks, lineJobStationTasks)
                    && addTasks(item.id)}
                  >
                    {item.text}
                  </ItemText>
                  <TaskType>{item.taskType.name.slice(0, 1)}</TaskType>
                  <TaskDuration>
                    {item.estimated}
                    {' mins'}
                  </TaskDuration>
                </StyledMenuItem>
              ))}
            </TasksBlockWrapper>
          )}
          <ButtonWrapper>
            <ContainedButton
              variant="contained"
              color="primary"
              colorType="classic"
              onClick={onClickAddNewTask}
              text={BUTTONS_TEXT.createNew}
            />
          </ButtonWrapper>
          {tasks && tasks.length === 0 && (
            <TextWrapper>
              {libraryEmptyPlaceholder.tasks}
            </TextWrapper>
          )}
        </StyledCollapse>

        <ModalDialog
          open={idTaskToDelete.id}
          buttonsNames={{
            confirmButtonText: 'REMOVE',
            cancelButtonText: 'CANCEL',
          }}
          headerText={DELETE_TASK_MODAL_HEADER}
          bodyText={DELETE_TASK_MODAL_TEXT}
          onClickCancel={() => setIdTaskToDelete({})}
          onClickConfirm={() => onDeleteTask(idTaskToDelete.id)}
        />

        <CreateTaskModalDialog
          open={isAddNewTaskModalOpen || isEditTaskModalOpen}
          buttonsNames={isEditTaskModalOpen ? {
            confirmButtonText: 'UPDATE',
            cancelButtonText: 'DELETE',
          }
            : {
              confirmButtonText: 'CREATE',
              cancelButtonText: 'CANCEL',
            }}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          isEditTaskModalOpen={isEditTaskModalOpen}
          onChangeTaskDescription={onChangeTaskDescription}
          onDurationChange={onDurationChange}
          onAverageChange={onAverageChange}
          changeTaskTypeRadio={changeTaskTypeRadio}
          onFixtureChange={onFixtureChange}
          taskAdditionalData={taskAdditionalData}
          onClose={closeAddEditNewTaskModal}
          headerText={isEditTaskModalOpen ? UPDATE_TASK_MODAL_HEADER : CREATE_TASK_MODAL_HEADER}
          onClickCancel={() =>
            (isEditTaskModalOpen
              ? openDeleteDialog(taskAdditionalData.editedTaskId)
              : closeAddEditNewTaskModal())}
          onClickConfirm={(e) =>
            (isEditTaskModalOpen
              ? onUpdateTaskData(taskAdditionalData.editedTaskId, e)
              : confirmAddNewTaskModal(e))}
        />
      </MultiSelectListsWrapper>
    </ClickAwayListener>
  );
};

TasksMultiSelectGroup.propTypes = {};

const mapStateToProps = state => ({
  match: PropTypes.instanceOf(Object),
  tasks: state.supervisorJobDetails.lineTasks,
  stationTasks: state.supervisorJobDetails.stationTasks,
  lineJobStationTasks: state.supervisorJobDetails.lineJobStationTasks,
  lineJobStations: state.supervisorJobDetails.lineJobStations,

});

const mapDispatchToProps = dispatch => bindActionCreators({
  getLineJobTasks,
  addTasksToStation,
  createNewTask,
  updateTask,
  deleteTask,
  updateLineTasks,
  getLineJobStationTasks,
  setLineJobStationTasks,
  updateLineJobStationTasks,
  updateStationTasks,
  removeTasksFromStaton,
  clearStationTasks,
  getLineJobStations,
  getLineJobStationsWithDetails,
  getLineJobStationDocuments,
  getLineJobID,
  getLineJobStationUnitChecksWithoutSettingToRedux,
  setIsStationHasUnitChecks,
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
)(TasksMultiSelectGroup);
