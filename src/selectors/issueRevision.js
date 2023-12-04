import { createSelector } from 'reselect';
import {groupingArrayOfObjectsByKey} from "../utils/arrayFilters";
const selectIssueRevisionState = state => state.issueRevision;

const selectOperatorNotifications = () =>
  createSelector(
    selectIssueRevisionState,
    state => state.operatorNotifications,
  );

const selectOperatorModalNotifications = () =>
  createSelector(
    selectIssueRevisionState,
    state => {
      const grouped = groupingArrayOfObjectsByKey(state.operatorModalModalNotifications, 'createdDateTime')
      return grouped.length ? grouped : [];
    },
  );

const selectStationNotificationsTypes = () =>
  createSelector(
    selectIssueRevisionState,
    state => state.stationNotificationsTypes,
  );

const selectMonitorNotifications = () =>
  createSelector(
    selectIssueRevisionState,
    state => state.monitorNotifications,
  );

const selectMonitorModalNotifications = () =>
  createSelector(
    selectIssueRevisionState,
    state => {
      const grouped = groupingArrayOfObjectsByKey(state.monitorModalModalNotifications, 'createdDateTime')
      return grouped.length ? grouped : [];
    },
  );

const selectIsStationsWasDeletedNotification = () =>
  createSelector(
    selectIssueRevisionState,
    state => state.deletedStationData,
  );

export {
  selectStationNotificationsTypes,
  selectMonitorNotifications,
  selectMonitorModalNotifications,
  selectOperatorNotifications,
  selectOperatorModalNotifications,
  selectIsStationsWasDeletedNotification,
};
