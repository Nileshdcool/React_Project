import {
  IspectionTasksWrapper,
  MaterialsBlocksWrapper,
  OperationTasksWrapper,
  TasksPanelWrapper,
  UnitChecksWrapper,
} from './styledComponents';
import {
  selectOperatorKPI,
  selectStationInspectionTasks,
  selectStationOperationTasks,
  selectStationUnitChecks,
} from '../../../../../../selectors/operatorSelectors';

import ListComponent from '../../../../../../components/ListComponent/ListComponent';
import React from 'react';
import { TASKS_LISTS } from '../../../../../../constants/labelsNaming';
import { TasksList } from './Lists/TasksList'
import UnitChecksList from './Lists/UnitChecksList'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOperatorNotifications } from '../../../../../../selectors/issueRevision';

const initialBlocksItemsCount = {
  operation: 4,
  inspection: 4,
  unitchecks: 5,
};

const TasksItem = ({
  operationTasks,
  inspectionTasks,
  unitChecks,
  notifications,
  sideBarData
}) => (
    <TasksPanelWrapper>
        <OperationTasksWrapper isBlockMinHeight={operationTasks.length >= initialBlocksItemsCount.operation}>
          <ListComponent
            notifications={notifications}
            title={TASKS_LISTS.operation}
            notificationsType="operationTasks"
            tasks={operationTasks}
            sideBarData={sideBarData}
          >
            <TasksList
              tasks={operationTasks}
            />
          </ListComponent>
        </OperationTasksWrapper>
        <IspectionTasksWrapper isBlockMinHeight={inspectionTasks.length >= initialBlocksItemsCount.inspection}>
          <ListComponent
            notifications={notifications}
            title={TASKS_LISTS.inspection}
            notificationsType="inspectionTasks"
            tasks={inspectionTasks}
            sideBarData={sideBarData}
          >
            <TasksList
              tasks={inspectionTasks}
            />
          </ListComponent>
        </IspectionTasksWrapper>
        <UnitChecksWrapper isBlockMinHeight={unitChecks.length >= initialBlocksItemsCount.unitchecks} >
          <ListComponent
            title={TASKS_LISTS.unitchecks}
            notifications={notifications}
            notificationsType="unitChecks"
            tasks={unitChecks}
            sideBarData={sideBarData}
          >
            <UnitChecksList
              checks={unitChecks}
            />
          </ListComponent>
        </UnitChecksWrapper>
    </TasksPanelWrapper>
  );

const mapStateToProps = createStructuredSelector({
  operationTasks: selectStationOperationTasks(),
  inspectionTasks: selectStationInspectionTasks(),
  kpi: selectOperatorKPI(),
  unitChecks: selectStationUnitChecks(),
  notifications: selectOperatorNotifications(),
});

const withConnect = connect(
  mapStateToProps,
);

export default compose(
  withConnect,
)(TasksItem);
