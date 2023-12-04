import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getActiveLineJobs = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lines/${id}/lineJobs/active`,
      method: 'GET',
      types: [types.GET_ACTIVE_LINE_JOBS, types.GET_ACTIVE_LINE_JOBS_SUCCESS, types.GET_ACTIVE_LINE_JOBS_ERROR],
    },
  });

export const getLineWorkOrderHours = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lines/${id}/wo-hours`,
      method: 'GET',
      types: [
        types.GET_LINE_WORK_ORDER_HOURS,
        types.GET_LINE_WORK_ORDER_HOURS_SUCCESS,
        types.GET_LINE_WORK_ORDER_HOURS_ERROR,
      ],
    },
  });

  export const getLineMonthlyShiftGoals = (id) => dispatch =>
    dispatch({
      [CALL_API]: {
        endpoint: `/api/lines/${id}/shift-goals`,
        method: 'GET',
        types: [
          types.GET_LINE_MONTHLY_SHIFT_GOALS,
          types.GET_LINE_MONTHLY_SHIFT_GOALS_SUCCESS,
          types.GET_LINE_MONTHLY_SHIFT_GOALS_ERROR,
        ],
      },
    }
  );

  export const updateUnitsPlanned = (id, lineId, planned) => dispatch =>
    dispatch({
      [CALL_API]: {
        endpoint: `/api/Shifts/${id}/shift-goals?LineId=${lineId}&Planned=${planned}`,
        method: 'POST',
        types: [
          types.SET_PLANNED_SHIFT,
          types.SET_PLANNED_SHIFT_SUCCESS,
          types.SET_PLANNED_SHIFT_ERROR,
        ],
      },
    }
  );

export const getLineAverages = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lines/${id}/line-averages`,
      method: 'GET',
      types: [
        types.GET_LINE_AVERAGES,
        types.GET_LINE_AVERAGES_SUCCESS,
        types.GET_LINE_AVERAGES_ERROR,
      ],
    },
  });

export const getActiveLineJobsStations = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lines/${id}/lineJobStations/active`,
      method: 'GET',
      types: [
        types.GET_ACTIVE_LINE_JOBS_STATIONS,
        types.GET_ACTIVE_LINE_JOBS_STATIONS_SUCCESS,
        types.GET_ACTIVE_LINE_JOBS_STATIONS_ERROR,
      ],
    },
  });
export const getOpenedStationTasks = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/tasks`,
      method: 'GET',
      types: [
        types.GET_OPENED_STATION_TASKS,
        types.GET_OPENED_STATION_TASKS_SUCCESS,
        types.GET_OPENED_STATION_TASKS_ERROR,
      ],
    },
  });
export const markSignalAsViewed = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/stationSignals/${id}/viewed`,
      method: 'POST',
      types: [
        types.MARK_SIGNAL_AS_VIEWED,
        types.MARK_SIGNAL_AS_VIEWED_SUCCESS,
        types.MARK_SIGNAL_AS_VIEWED_ERROR,
      ],
      body: { id },
    },
  });
export const getMonitorStationsSignals = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lines/${id}/signals`,
      method: 'GET',
      types: [
        types.GET_MONITOR_STATIONS_SIGNALS,
        types.GET_MONITOR_STATIONS_SIGNALS_SUCCESS,
        types.GET_MONITOR_STATIONS_SIGNALS_ERROR,
      ],
    },
  });

export const clearOpenedStationTasks = () => ({
  type: types.CLEAR_OPENED_STATION_TASKS,
});

export const setOperatorSignals = (data) => ({
  type: types.SET_OPERATOR_SIGNALS,
  payload: data,
});

export const updateOperatorSignals = (data) => ({
  type: types.UPDATE_OPERATOR_SIGNALS,
  payload: data,
});

export const resetSignals = () => ({
  type: types.RESET_SIGNALS
});
