import { createSelector } from 'reselect';
import { LINE_JOB_COLORS, TASKS_TYPES } from '../constants';

const selectLinesData = state => state.monitorData;
const selectAlertSignalsData = state => state.signals;

const selectActiveLineJobs = () =>
  createSelector(
    selectLinesData,
    state => state.activeLineJobs,
  );

const selectActiveLineJobsColorsMap = () =>
  createSelector(
    selectLinesData,
    state => {
      const object = {};
      state.activeLineJobs.forEach((item, index) => object[item.id] = LINE_JOB_COLORS[`${index}`]);
      return object;
    },
  );
const selectLineWorkOrderHours = () =>
  createSelector(
    selectLinesData,
    state => state.lineWorkOrderHours,
  );
const selectLineMonthlyShiftGoals = () =>
  createSelector(
    selectLinesData,
    state => state.lineMonthlyShiftGoals,
);
const selectLineAverages = () =>
  createSelector(
    selectLinesData,
    state => state.lineAverages,
  );

const selectActiveLineJobsStations = () =>
  createSelector(
    selectLinesData,
    state => state.activeLineJobsStations,
  );

const selectOpenedStationOperationTasks = () =>
  createSelector(
    selectLinesData,
    state => {
      return state.openedStationTasks.filter(task =>
        task.taskType.name === TASKS_TYPES.operation);
    },
  );

const selectOpenedStationInspectionTasks = () =>
  createSelector(
    selectLinesData,
    state => {
      return state.openedStationTasks.filter(task =>
        task.taskType.name === TASKS_TYPES.inspection);
    },
  );
const selectMonitorStationsAlertSignals = () =>
  createSelector(
    selectAlertSignalsData,
    state => state.operatorAlertSignals,
  );
const selectMonitorStationsSignals = () =>
  createSelector(
    selectLinesData,
    state => state.monitorStationsSignals,
  );

export {
  selectActiveLineJobs,
  selectLineWorkOrderHours,
  selectLineMonthlyShiftGoals,
  selectLineAverages,
  selectActiveLineJobsColorsMap,
  selectActiveLineJobsStations,
  selectOpenedStationOperationTasks,
  selectOpenedStationInspectionTasks,
  selectMonitorStationsAlertSignals,
  selectMonitorStationsSignals,
};
