import { FIRST_ARTICLE } from '../constants';
import { createSelector } from 'reselect';
const selectSupervisorJobDetailsState = state => state.supervisorJobDetails;

const selectLineUnitChecks = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.lineJobUnitChecks.filter(item => item.text !== FIRST_ARTICLE),
  );

const selectFirstArticleUnitCheck = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.lineJobUnitChecks.filter(item => item.text === FIRST_ARTICLE)[0],
  );

const selectStationWidgetUnitChecks = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.widgetUnitChecks.filter(item => item.text !== FIRST_ARTICLE),
  );

export {
  selectLineUnitChecks,
  selectStationWidgetUnitChecks,
  selectFirstArticleUnitCheck,
};
