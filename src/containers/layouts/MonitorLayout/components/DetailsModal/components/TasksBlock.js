import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Pluralize from 'pluralize';
import {
  selectOpenedStationInspectionTasks,
  selectOpenedStationOperationTasks,
} from '../../../../../../selectors/monitorSelectors';
import {
  TaskNumber, TasksBlockList, TasksBlockWrapper, TaskText,
} from '../styledComponents';
import { TASKS_TYPES } from '../../../../../../constants';

const TasksBlock = ({ operationTasks, inspectionTasks }) => (
  <TasksBlockWrapper>
    {!!operationTasks.length && (
    <>
      <Typography variant="body2">
        {`${TASKS_TYPES.operation} TASKS`}
      </Typography>
      <TasksBlockList>
        {operationTasks.map((task, index) => (
          <li key={task.id}>
            <TaskNumber>{index + 1}</TaskNumber>
            <TaskText>{task.text}</TaskText>
            <span>
              {`${task.estimated} ${Pluralize('min', task.estimated)}`}
            </span>
          </li>
        ))}
      </TasksBlockList>
    </>
    )}
    {!!inspectionTasks.length && (
    <>
      <Typography variant="body2">
        {`${TASKS_TYPES.inspection} TASKS`}
      </Typography>
      <TasksBlockList>
        {inspectionTasks.map((task, index) => (
          <li key={task.id}>
            <TaskNumber>{index + 1}</TaskNumber>
            <TaskText>{task.text}</TaskText>
            <span>
              {`${task.estimated} ${Pluralize('min', task.estimated)}`}
            </span>
          </li>
        ))}
      </TasksBlockList>
    </>
    )}
  </TasksBlockWrapper>
);

const mapStateToProps = createStructuredSelector({
  operationTasks: selectOpenedStationOperationTasks(),
  inspectionTasks: selectOpenedStationInspectionTasks(),
});

export default connect(
  mapStateToProps,
)(TasksBlock);
