import { createSelector } from 'reselect';
const selectSupervisorJobDetailsState = state => state.supervisorJobDetails;

const selectLineVDRs = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.lineJobVDRs,
  );

const selectStationWidgetVDRs = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.widgetVDRs,
  );

export {
  selectLineVDRs,
  selectStationWidgetVDRs,
};
