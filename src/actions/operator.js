import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getOperatorDrawings = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/drawings`,
      method: 'GET',
      types: [types.GET_OPERATOR_DRAWINGS, types.GET_OPERATOR_DRAWINGS_SUCCESS, types.GET_OPERATOR_DRAWINGS_ERROR],
    },
  });

export const getOperatorTasks = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/tasks`,
      method: 'GET',
      types: [types.GET_OPERATOR_TASKS, types.GET_OPERATOR_TASKS_SUCCESS, types.GET_OPERATOR_TASKS_ERROR],
    },
  });

export const getLineJobStationKPI = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/kpi`,
      method: 'GET',
      types: [types.GET_LINEJOBSTATION_KPI, types.GET_LINEJOBSTATION_KPI_SUCCESS, types.GET_LINEJOBSTATION_KPI_ERROR],
    },
  });

export const getOperatorSidebarData = (stationId) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/nextForStation/${stationId}`,
      method: 'GET',
      types: [
        types.GET_OPERATOR_SIDEBAR_DATA,
        types.GET_OPERATOR_SIDEBAR_DATA_SUCCESS,
        types.GET_OPERATOR_SIDEBAR_DATA_ERROR,
      ],
    },
  });

export const getLineJobNotesOperatorView = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/notes`,
      method: 'GET',
      types: [
        types.GET_LINEJOB_NOTES_OPERATOR_VIEW,
        types.GET_LINEJOB_NOTES_OPERATOR_VIEW_SUCCESS,
        types.GET_LINEJOB_NOTES_OPERATOR_VIEW_ERROR,
      ],
    },
  });

export const getOperatorStationDocuments = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/documents`,
      method: 'GET',
      types: [
        types.GET_OPERATOR_STATION_DOCUMENTS,
        types.GET_OPERATOR_STATION_DOCUMENTS_SUCCESS,
        types.GET_OPERATOR_STATION_DOCUMENTS_ERROR,
      ],
    },
  });

export const getOperatorUnitChecks = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/unitchecks/operator`,
      method: 'GET',
      types: [
        types.GET_OPERATOR_UNIT_CHECKS,
        types.GET_OPERATOR_UNIT_CHECKS_SUCCESS,
        types.GET_OPERATOR_UNIT_CHECKS_ERROR,
      ],
    },
  });

export const startUnitCheck = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/start-unit`,
      method: 'POST',
      types: [
        types.START_UNIT_CHECK,
        types.START_UNIT_CHECK_SUCCESS,
        types.START_UNIT_CHECK_ERROR,
      ],
      body: { id },
    },
  });

export const finishUnitCheck = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/finish-unit`,
      method: 'POST',
      types: [
        types.FINISH_UNIT_CHECK,
        types.FINISH_UNIT_CHECK_SUCCESS,
        types.FINISH_UNIT_CHECK_ERROR,
      ],
      body: { id },
    },
  });

export const doneUnitCheck = (id, stationUnitCheckId) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/unitchecks/${stationUnitCheckId}/done`,
      method: 'POST',
      types: [
        types.DONE_UNIT_CHECK,
        types.DONE_UNIT_CHECK_SUCCESS,
        types.DONE_UNIT_CHECK_ERROR,
      ],
      body: { id, stationUnitCheckId },
    },
  });

export const undoneUnitCheck = (id, stationUnitCheckId) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/unitchecks/${stationUnitCheckId}/undone`,
      method: 'POST',
      types: [
        types.UNDONE_UNIT_CHECK,
        types.UNDONE_UNIT_CHECK_SUCCESS,
        types.UNDONE_UNIT_CHECK_ERROR,
      ],
      body: { id, stationUnitCheckId },
    },
  });


export const getSignalTypes = () => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: '/api/signalTypes',
      method: 'GET',
      types: [
        types.GET_SIGNAL_TYPES,
        types.GET_SIGNAL_TYPES_SUCCESS,
        types.GET_SIGNAL_TYPES_ERROR,
      ],
    },
  });
export const getSignalUrgencyTypes = () => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: '/api/signalUrgencyTypes/',
      method: 'GET',
      types: [
        types.GET_URGENCY_SIGNAL_TYPES,
        types.GET_URGENCY_SIGNAL_TYPES_SUCCESS,
        types.GET_URGENCY_SIGNAL_TYPES_ERROR,
      ],
    },
  });
export const getSignalsForLineJobStation = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/signals`,
      method: 'GET',
      types: [
        types.GET_SIGNALS_FOR_LINEJOBSTATION_TYPES,
        types.GET_SIGNALS_FOR_LINEJOBSTATION_SUCCESS,
        types.GET_SIGNALS_FOR_LINEJOBSTATION_ERROR,
      ],
    },
  });

export const sendSignal = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/signals`,
      method: 'POST',
      types: [
        types.SEND_SIGNAL,
        types.SEND_SIGNAL_SUCCESS,
        types.SEND_SIGNAL_ERROR,
      ],
      body,
    },
  });

export const clearActiveSignals = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/signals/clear`,
      method: 'POST',
      types: [
        types.CLEAR_ACTIVE_SIGNALS,
        types.CLEAR_ACTIVE_SIGNALS_SUCCESS,
        types.CLEAR_ACTIVE_SIGNALS_ERROR,
      ],
      body: { id },
    },
  });

export const approveUnitCheck = (id, employeeNumber) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/confirm-first-article`,
      method: 'POST',
      types: [
        types.APPROVE_FIRST_ARTICLE,
        types.APPROVE_FIRST_ARTICLE_SUCCESS,
        types.APPROVE_FIRST_ARTICLE_ERROR,
      ],
      body: { id, employeeNumber },
    },
  });

  export const getOperatorLogs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/logs`,
      method: 'GET',
      types: [
        types.GET_LOGS,
        types.GET_LOGS_SUCCESS,
        types.GET_LOGS_ERROR,
      ],
    },
  });
  export const getOperatorStationBoms = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/boms`,
      method: 'GET',
      types: [
        types.GET_OPERATOR_STATION_BOMS,
        types.GET_OPERATOR_STATION_BOMS_SUCCESS,
        types.GET_OPERATOR_STATION_BOMS_ERROR,
      ],
    },
  });

export const showOperatorAnnotations = bool => ({
  type: types.SHOW_OPERATOR_DRAWINGS_ANNOTATIONS,
  payload: bool,
});

export const lastOpenedDrawing = name => ({
  type: types.LAST_OPENED_DRAWING,
  payload: name
});

export const clearOperatorData = () => ({
  type: types.CLEAR_OPERATOR_DATA
})
