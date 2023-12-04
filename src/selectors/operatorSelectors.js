import { TASKS_TYPES } from '../constants';

import { createBOMsWithChildsAndParent } from '../utils/boms';
import { createSelector } from 'reselect';
import moment from 'moment';
import sortBy from 'lodash/sortBy';

const selectSupervisorJobDetailsState = state => state.supervisorJobDetails;
const selectOperatorState = state => state.operatorStore;

const selectOperatorSidebarData = () =>
  createSelector(
    selectOperatorState,
    state => state.operatorSidebarData,
  );

const selectEmployeeNumberError = () =>
  createSelector(
    selectOperatorState,
    state => state.employeeNumberError,
  );

const selectIsFAApproved = () =>
  createSelector(
    selectOperatorState,
    state => state.isApprovedFA,
  );
const selectLastOpenedDrawing = () =>
  createSelector(
    selectOperatorState,
    state => state.lastOpenedDrawing,
  );

const selectIsStationHasActiveUnit = () =>
  createSelector(
    selectOperatorState,
    state => !!state.operatorSidebarData && state.operatorSidebarData.hasActiveStationUnit,
  );

const selectOperatorShowedAnnotations = () =>
  createSelector(
    selectOperatorState,
    state => state.isShowed,
  );

const selectOperatorKPI = () =>
  createSelector(
    selectOperatorState,
    state => state.kpi,
  );

const selectOperatorDrawings = () =>
  createSelector(
    selectOperatorState,
    state => state.drawings.map(item => ({
      ...item,
      fileUrl: `${item.drawing.fileUrl}`,
      type: 'drawing'
    })),
  );

const selectStationOperationTasks = () =>
  createSelector(
    selectOperatorState,
    state => sortBy(state.tasks.filter(item => item.taskType.description === TASKS_TYPES.operation), 'sortIndex')
  );

const selectStationInspectionTasks = () =>
  createSelector(
    selectOperatorState,
    state => sortBy(state.tasks.filter(item => item.taskType.description === TASKS_TYPES.inspection), 'sortIndex')
  );

const selectStationVDRs = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.widgetVDRs.map(vdr => `${vdr.sequence} - ${vdr.subject}`),
  );

const selectStationITPs = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.widgetITPs.map(itp => ({
      name: itp.itpNumber,
      url: itp.url,
      id: itp.id
    })),
  );

const selectStationTopLevelBOMs = () =>
  createSelector(
    selectOperatorState,
    state => {
      const parsedBoms = createBOMsWithChildsAndParent(state.stationBOMs.map(item => item.bom));
      return parsedBoms.filter(item => !!item.children.length);
    },
  );

const selectStationBOMs = () =>
  createSelector(
    selectOperatorState,
    state => state.stationBOMs.map(item => item.bom),
  );

const selectStationNotes = () =>
  createSelector(
    selectOperatorState,
    state => (!!state.jobNotes && state.jobNotes.text ? [state.jobNotes.text] : []),
  );

const selectStationUnitChecks = () =>
  createSelector(
    selectOperatorState,
    state => state.unitChecks,
  );

const selectSignalTypes = () =>
  createSelector(
    selectOperatorState,
    state => state.signalTypes,
  );

const selectUrgencySignalTypes = () =>
  createSelector(
    selectOperatorState,
    state => state.urgencySignalTypes,
  );

const selectLineJobStationSignals = () =>
  createSelector(
    selectOperatorState,
    state => state.lineJobStationSignals,
  );

const selectStationDocuments = () =>
  createSelector(
    selectOperatorState,
    state => sortBy(state.operatorDocuments, 'sortIndex').map(doc => ({
      name: doc.fileName,
      fileUrl: `${doc.fileUrl}`,
      type: 'document',
      id: doc.id
    })),
  );

const selectOperatorLogs = () =>
  createSelector(
    selectOperatorState,
    state => state.logs.map(item => ({
      operator: item.operator.fullName,
      duration: `${item.duration} ${item.duration > 1 ? 'mins' : 'min'}`,
      date: moment(item.date).format('MM/DD/YYYY')
    })),
  );

const selectLoadingLogs = () =>
  createSelector(
    selectOperatorState,
    state => state.loading,
  );

export {
  selectStationVDRs,
  selectStationITPs,
  selectStationTopLevelBOMs,
  selectStationBOMs,
  selectStationNotes,
  selectStationDocuments,
  selectOperatorDrawings,
  selectOperatorShowedAnnotations,
  selectOperatorSidebarData,
  selectStationOperationTasks,
  selectStationInspectionTasks,
  selectOperatorKPI,
  selectLastOpenedDrawing,
  selectStationUnitChecks,
  selectEmployeeNumberError,
  selectIsStationHasActiveUnit,
  selectIsFAApproved,
  selectSignalTypes,
  selectUrgencySignalTypes,
  selectLineJobStationSignals,
  selectOperatorLogs,
  selectLoadingLogs,
};
