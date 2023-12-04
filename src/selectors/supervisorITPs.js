import { createSelector } from 'reselect';
const selectSupervisorJobDetailsState = state => state.supervisorJobDetails;


const selectLineITPs = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.supervisorLineJobITPs,
  );

const selectStationWidgetITPs = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.widgetITPs,
  );

export {
  selectLineITPs,
  selectStationWidgetITPs,
};
