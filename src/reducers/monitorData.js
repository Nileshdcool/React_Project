import {
  GET_ACTIVE_LINE_JOBS,
  GET_ACTIVE_LINE_JOBS_SUCCESS,
  GET_ACTIVE_LINE_JOBS_ERROR,
  GET_LINE_WORK_ORDER_HOURS,
  GET_LINE_WORK_ORDER_HOURS_SUCCESS,
  GET_LINE_WORK_ORDER_HOURS_ERROR,
  GET_LINE_MONTHLY_SHIFT_GOALS,
  GET_LINE_MONTHLY_SHIFT_GOALS_SUCCESS,
  GET_LINE_MONTHLY_SHIFT_GOALS_ERROR,
  SET_PLANNED_SHIFT,
  SET_PLANNED_SHIFT_SUCCESS,
  SET_PLANNED_SHIFT_ERROR,
  GET_LINE_AVERAGES,
  GET_LINE_AVERAGES_SUCCESS,
  GET_LINE_AVERAGES_ERROR,
  GET_ACTIVE_LINE_JOBS_STATIONS,
  GET_ACTIVE_LINE_JOBS_STATIONS_SUCCESS,
  GET_ACTIVE_LINE_JOBS_STATIONS_ERROR,
  GET_OPENED_STATION_TASKS,
  GET_OPENED_STATION_TASKS_SUCCESS,
  GET_OPENED_STATION_TASKS_ERROR,
  CLEAR_OPENED_STATION_TASKS,
  GET_MONITOR_STATIONS_SIGNALS,
  GET_MONITOR_STATIONS_SIGNALS_SUCCESS,
  GET_MONITOR_STATIONS_SIGNALS_ERROR,
} from '../constants/actionCreators';

const INITIAL_STATE = {
  activeLineJobs: [],
  lineWorkOrderHours: [],
  lineMonthlyShiftGoals: [],
  lineAverages: [],
  activeLineJobsStations: [],
  openedStationTasks: [],
  loading: false,
  error: '',
  monitorStationsSignals: [],
};
export const monitorData = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_ACTIVE_LINE_JOBS:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_ACTIVE_LINE_JOBS_SUCCESS:
      return {
        ...state,
        activeLineJobs: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_ACTIVE_LINE_JOBS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_LINE_WORK_ORDER_HOURS:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LINE_WORK_ORDER_HOURS_SUCCESS:
      return {
        ...state,
        lineWorkOrderHours: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINE_WORK_ORDER_HOURS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_LINE_MONTHLY_SHIFT_GOALS:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LINE_MONTHLY_SHIFT_GOALS_SUCCESS:
       return {
        ...state,
        lineMonthlyShiftGoals: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINE_MONTHLY_SHIFT_GOALS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case SET_PLANNED_SHIFT:
      return { ...state, loading: true };
    case SET_PLANNED_SHIFT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case SET_PLANNED_SHIFT_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      }; 
    case GET_LINE_AVERAGES:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LINE_AVERAGES_SUCCESS:
      return {
        ...state,
        lineAverages: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINE_AVERAGES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_ACTIVE_LINE_JOBS_STATIONS:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_ACTIVE_LINE_JOBS_STATIONS_SUCCESS:
      return {
        ...state,
        activeLineJobsStations: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_ACTIVE_LINE_JOBS_STATIONS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_OPENED_STATION_TASKS:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_OPENED_STATION_TASKS_SUCCESS:
      return {
        ...state,
        openedStationTasks: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_OPENED_STATION_TASKS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_MONITOR_STATIONS_SIGNALS:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_MONITOR_STATIONS_SIGNALS_SUCCESS:
      return {
        ...state,
        monitorStationsSignals: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_MONITOR_STATIONS_SIGNALS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case CLEAR_OPENED_STATION_TASKS:
      return {
        ...state,
        openedStationTasks: [],
        error: '',
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};
