import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getLineJobRevisionNotifications = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/notifications`,
      method: 'GET',
      types: [
        types.GET_LINEJOB_REVISION_NOTIFICATION,
        types.GET_LINEJOB_REVISION_NOTIFICATION_SUCCESS,
        types.GET_LINEJOB_REVISION_NOTIFICATION_ERROR
      ],
    },
  });
export const getSupervisorRevisionNotifications = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/notifications/supervisor`,
      method: 'GET',
      types: [
        types.GET_SUPERVISOR_REVISION_NOTIFICATION,
        types.GET_SUPERVISOR_REVISION_NOTIFICATION_SUCCESS,
        types.GET_SUPERVISOR_REVISION_NOTIFICATION_ERROR
      ],
    },
  });
export const getOperatorRevisionNotifications = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/notifications/operator`,
      method: 'GET',
      types: [
        types.GET_OPERATOR_REVISION_NOTIFICATION,
        types.GET_OPERATOR_REVISION_NOTIFICATION_SUCCESS,
        types.GET_OPERATOR_REVISION_NOTIFICATION_ERROR
      ],
    },
  });

export const markNotificationsAsOperator = body => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/notifications/operator`,
      method: 'POST',
      types: [
        types.MARK_NOTIFICATION_AS_READ_OPERATOR,
        types.MARK_NOTIFICATION_AS_READ_OPERATOR_SUCCESS,
        types.MARK_NOTIFICATION_AS_READ_OPERATOR_ERROR
      ],
      body
    },
  });

export const markNotificationsAsSupervisor = body => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/notifications/supervisor`,
      method: 'POST',
      types: [
        types.MARK_NOTIFICATION_AS_READ_SUPERVISOR,
        types.MARK_NOTIFICATION_AS_READ_SUPERVISOR_SUCCESS,
        types.MARK_NOTIFICATION_AS_READ_SUPERVISOR_ERROR
      ],
      body
    },
  });

export const viewNotificationsModalAsOperator = (arr) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/notifications/operator/viewed`,
      method: 'POST',
      types: [
        types.VIEW_NOTIFICATIONS_MODAL_AS_OPERATOR,
        types.VIEW_NOTIFICATIONS_MODAL_AS_OPERATOR_SUCCESS,
        types.VIEW_NOTIFICATIONS_MODAL_AS_OPERATOR_ERROR
      ],
      body: { items: [...arr] }
    },
  });

export const viewNotificationsModalAsSupervisor = (arr) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/Notifications/supervisor/viewed`,
      method: 'POST',
      types: [
        types.VIEW_NOTIFICATIONS_MODAL,
        types.VIEW_NOTIFICATIONS_MODAL_SUCCESS,
        types.VIEW_NOTIFICATIONS_MODAL_ERROR
      ],
      body: { items: [...arr] }
    },
  });

export const sendManualIssueRevision = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/revision/manual`,
      method: 'POST',
      types: [
        types.SEND_ISSUE_REVISION,
        types.SEND_ISSUE_REVISION_SUCCESS,
        types.SEND_ISSUE_REVISION_ERROR
      ],
      body
    },
  });
export const sendAutomaticIssueRevision = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/revision/automatic`,
      method: 'POST',
      types: [
        types.SEND_ISSUE_REVISION,
        types.SEND_ISSUE_REVISION_SUCCESS,
        types.SEND_ISSUE_REVISION_ERROR
      ],
      body
    },
  });

export const getStationRevisedElementTypes = () => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/StationRevisedElementTypes`,
      method: 'GET',
      types: [
        types.GET_STATION_REVISED_ELEMENT_TYPE,
        types.GET_STATION_REVISED_ELEMENT_TYPE_SUCCESS,
        types.GET_STATION_REVISED_ELEMENT_TYPE_ERROR
      ],
    },
  });

export const getLineJobRevisedElementTypes = () => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobRevisedElementTypes`,
      method: 'GET',
      types: [
        types.GET_LINEJOB_REVISED_ELEMENT_TYPES,
        types.GET_LINEJOB_REVISED_ELEMENT_TYPES_SUCCESS,
        types.GET_LINEJOB_REVISED_ELEMENT_TYPES_ERROR
      ],
    },
  });

export const updateStationNotificationsList = (data) => ({
  type: types.UPDATE_STATION_NOTIFICATIONS_LIST,
  payload: data,
});
export const updateSupervisorNotificationsList = (data) => ({
  type: types.UPDATE_SUPERVISOR_NOTIFICATIONS_LIST,
  payload: data,
});
export const clearRevisionNotifications = () => ({
  type: types.CLEAR_REVISION_NOTIFICATIONS,
});
export const clearRevisionNotificationDate = () => ({
  type: types.CLEAR_REVISION_NOTIFICATION_DATE,
});

export const clearMonitorNotificationsData = () => ({
  type: types.CLEAR_MONITOR_REVISION_NOTIFICATIONS,
});

export const setLineJobStationDeletedNotification = (data) => ({
  type: types.SET_LINEJOB_STATION_DELETED_NOTIFICATION,
  payload: data,
});

