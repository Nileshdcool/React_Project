import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

const selectLinesData = state => state.lines;
const selectLineJobsData = state => state.supervisorJobDetails;

const queuePositionsInitialData = [
  { value: '', text: 'SET PHASE' },
];

const selectQueuePositions = () =>
  createSelector(
    selectLinesData,
    state => {
      const parsedQueuePositions = state.queuePositions.map(item => ({ value: item.id, text: item.name }));
      return [...queuePositionsInitialData, ...sortBy(parsedQueuePositions, 'value')];
    },
  );
const selectedLineJobDetailsQueuePositionName = () =>
  createSelector(
    selectLinesData,
    state => state.lineJobDetails !== null && state.lineJobDetails.queuePosition.name,
  );
const selectActivelineJobs = () =>
  createSelector(
    selectLinesData,
    state => state.activelineJobs,
  );
const selectAssignedToJobStationsCount = () =>
  createSelector(
    selectLineJobsData,
    state => state.lineJobStations.length,
  );

export {
  selectQueuePositions,
  selectedLineJobDetailsQueuePositionName,
  selectActivelineJobs,
  selectAssignedToJobStationsCount,
};
