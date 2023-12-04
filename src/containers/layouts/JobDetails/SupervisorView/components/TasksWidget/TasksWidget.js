import * as PropTypes from 'prop-types';

import sortBy from 'lodash/sortBy';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import {
  DragIndicatorIcon,
  HandDragWrapper,
  LeftBlock,
  StyledTypography,
  SupervisorFullHeightWidgetsWrapper,
  WidgetTypeSunbtitleWrapper,
} from '../styledComponents';
import { TasksHeader, TasksWrapper } from './styledComponents';

import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton';

const TasksWidget = ({
  title,
  stationTasks,
  removeTask,
  handleAddedEntities,
  updateStationTasks,
  updateLineJobStationTasks,
}) => {
  const onDragEnd = (result) => {
    console.log('DRAG and DROP TASKS WIDGET', result);
    if (!result.destination) {
      return;
    }
    const { destination, source } = result;
    const sortedStationTasks = sortBy(stationTasks, 'sortIndex');
    const newTaskIds = sortedStationTasks;
    const draggableElement = sortedStationTasks[source.index];
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableElement);
    const updatedNewArray = newTaskIds.map((item, i) => ({
      ...item,
      sortIndex: i,
    }));
    updateStationTasks(updatedNewArray);
    updateLineJobStationTasks(updatedNewArray);
    handleAddedEntities();
  };

  return (
    <SupervisorFullHeightWidgetsWrapper>
      <TasksHeader>
        <StyledTypography variant='subtitle1'>{title}</StyledTypography>
      </TasksHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='operation_tasks'>
          {(provided) => (
            <WidgetTypeSunbtitleWrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Typography variant='body2'>OPERATION TASKS</Typography>
              <TasksWrapper>
                <ul>
                  {stationTasks.length > 0 &&
                    sortBy(stationTasks, 'sortIndex').map(
                      (task, index) =>
                        task.taskType.name === 'Operation' && (
                          <Draggable
                            draggableId={`${task.fileName}-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <Tooltip title={task.text} placement='top'>
                                <li
                                  key={`${task.text}-${index}`}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  <LeftBlock>
                                    <HandDragWrapper
                                      {...provided.dragHandleProps}
                                    >
                                      <DragIndicatorIcon />
                                    </HandDragWrapper>
                                    <Typography variant='body2'>
                                      {task.text}
                                    </Typography>
                                  </LeftBlock>
                                  <CustomIconButton
                                    color='mainCardTitleColor'
                                    onClick={() => removeTask(task)}
                                    disableRipple
                                    icon={<ClearIcon />}
                                    iconFontSize='20px'
                                  />
                                  {provided.placeholder}
                                </li>
                              </Tooltip>
                            )}
                          </Draggable>
                        ),
                    )}
                </ul>
              </TasksWrapper>
            </WidgetTypeSunbtitleWrapper>
          )}
        </Droppable>
        <Droppable droppableId='inspection_tasks'>
          {(provided) => (
            <WidgetTypeSunbtitleWrapper
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Typography variant='body2'>INSPECTION TASKS</Typography>
              <TasksWrapper>
                <ul>
                  {stationTasks.length > 0 &&
                    sortBy(stationTasks, 'sortIndex').map(
                      (task, index) =>
                        task.taskType.name === 'Inspection' && (
                          <Draggable
                            draggableId={`${task.fileName}-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <Tooltip title={task.text} placement='top'>
                                <li
                                  key={`${task.text}-${index}`}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  <LeftBlock>
                                    <HandDragWrapper
                                      {...provided.dragHandleProps}
                                    >
                                      <DragIndicatorIcon />
                                    </HandDragWrapper>
                                    <Typography variant='body2'>
                                      {task.text}
                                    </Typography>
                                  </LeftBlock>
                                  <CustomIconButton
                                    color='mainCardTitleColor'
                                    onClick={() => removeTask(task)}
                                    disableRipple
                                    icon={<ClearIcon />}
                                    iconFontSize='20px'
                                  />
                                  {provided.placeholder}
                                </li>
                              </Tooltip>
                            )}
                          </Draggable>
                        ),
                    )}
                </ul>
              </TasksWrapper>
            </WidgetTypeSunbtitleWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </SupervisorFullHeightWidgetsWrapper>
  );
};

TasksWidget.propTypes = {
  title: PropTypes.string,
  updateStationTasks: PropTypes.func,
  updateLineJobStationTasks: PropTypes.func,
};

export default TasksWidget;
