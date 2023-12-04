import {
  APPROVE_FIRST_ARTICLE,
  APPROVE_FIRST_ARTICLE_ERROR,
  APPROVE_FIRST_ARTICLE_SUCCESS,
  CLEAR_OPERATOR_DATA,
  GET_LINEJOB_NOTES_OPERATOR_VIEW,
  GET_LINEJOB_NOTES_OPERATOR_VIEW_ERROR,
  GET_LINEJOB_NOTES_OPERATOR_VIEW_SUCCESS,
  GET_LINEJOBSTATION_KPI,
  GET_LINEJOBSTATION_KPI_ERROR,
  GET_LINEJOBSTATION_KPI_SUCCESS,
  GET_LOGS,
  GET_LOGS_ERROR,
  GET_LOGS_SUCCESS,
  GET_OPERATOR_DRAWINGS,
  GET_OPERATOR_DRAWINGS_ERROR,
  GET_OPERATOR_DRAWINGS_SUCCESS,
  GET_OPERATOR_SIDEBAR_DATA,
  GET_OPERATOR_SIDEBAR_DATA_ERROR,
  GET_OPERATOR_SIDEBAR_DATA_SUCCESS,
  GET_OPERATOR_STATION_BOMS,
  GET_OPERATOR_STATION_BOMS_ERROR,
  GET_OPERATOR_STATION_BOMS_SUCCESS,
  GET_OPERATOR_STATION_DOCUMENTS,
  GET_OPERATOR_STATION_DOCUMENTS_ERROR,
  GET_OPERATOR_STATION_DOCUMENTS_SUCCESS,
  GET_OPERATOR_TASKS,
  GET_OPERATOR_TASKS_ERROR,
  GET_OPERATOR_TASKS_SUCCESS,
  GET_OPERATOR_UNIT_CHECKS,
  GET_OPERATOR_UNIT_CHECKS_ERROR,
  GET_OPERATOR_UNIT_CHECKS_SUCCESS,
  GET_SIGNAL_TYPES,
  GET_SIGNAL_TYPES_ERROR,
  GET_SIGNAL_TYPES_SUCCESS,
  GET_SIGNALS_FOR_LINEJOBSTATION_ERROR,
  GET_SIGNALS_FOR_LINEJOBSTATION_SUCCESS,
  GET_SIGNALS_FOR_LINEJOBSTATION_TYPES,
  GET_URGENCY_SIGNAL_TYPES,
  GET_URGENCY_SIGNAL_TYPES_ERROR,
  GET_URGENCY_SIGNAL_TYPES_SUCCESS,
  LAST_OPENED_DRAWING,
  SHOW_OPERATOR_DRAWINGS_ANNOTATIONS,
} from '../constants/actionCreators';

const INITIAL_STATE = {
  loading: false,
  error: '',
  employeeNumberError: '',
  kpi: {},
  jobNotes: [],
  operatorDocuments: [],
  operatorSidebarData: null,
  drawings: [],
  tasks: [],
  unitChecks: [],
  isShowed: true,
  signalTypes: [],
  urgencySignalTypes: [],
  lineJobStationSignals: [],
  isApprovedFA: false,
  lastOpenedDrawing: '',
  logs: [],
  stationBOMs: [],
};

export const operatorStore = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_OPERATOR_SIDEBAR_DATA:
      return { ...state, loading: true };
    case GET_OPERATOR_SIDEBAR_DATA_SUCCESS:
      return {
        ...state,
        operatorSidebarData: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_OPERATOR_SIDEBAR_DATA_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_NOTES_OPERATOR_VIEW:
      return { ...state, loading: true };
    case GET_LINEJOB_NOTES_OPERATOR_VIEW_SUCCESS:
      return {
        ...state,
        jobNotes: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOB_NOTES_OPERATOR_VIEW_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_OPERATOR_DRAWINGS:
      return { ...state, loading: true };
    case GET_OPERATOR_DRAWINGS_SUCCESS:
      return {
        ...state,
        drawings: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_OPERATOR_DRAWINGS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_OPERATOR_TASKS:
      return { ...state, loading: true };
    case GET_OPERATOR_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_OPERATOR_TASKS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_OPERATOR_STATION_DOCUMENTS:
      return { ...state, loading: true };
    case GET_OPERATOR_STATION_DOCUMENTS_SUCCESS:
      return {
        ...state,
        operatorDocuments: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_OPERATOR_STATION_DOCUMENTS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_OPERATOR_UNIT_CHECKS:
      return { ...state, loading: true };
    case GET_OPERATOR_UNIT_CHECKS_SUCCESS:
      return {
        ...state,
        unitChecks: action.payload ? action.payload : [],
        loading: false,
        success: true,
        error: '',
      };
    case GET_OPERATOR_UNIT_CHECKS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_LINEJOBSTATION_KPI:
      return { ...state, loading: true };
    case GET_LINEJOBSTATION_KPI_SUCCESS:
      return {
        ...state,
        kpi: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOBSTATION_KPI_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case APPROVE_FIRST_ARTICLE:
      return { ...state, loading: true };
    case APPROVE_FIRST_ARTICLE_SUCCESS:
      return {
        ...state,
        isApprovedFA: true,
        loading: false,
        success: true,
        error: '',
      };
    case APPROVE_FIRST_ARTICLE_ERROR:
      return {
        ...state,
        employeeNumberError: action.description,
        loading: false,
        success: false,
      };
    case GET_LOGS:
      return { ...state, loading: true };
    case GET_LOGS_SUCCESS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LOGS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case LAST_OPENED_DRAWING:
      return {
        ...state,
        lastOpenedDrawing: action.payload,
      };
    case GET_SIGNAL_TYPES:
      return { ...state, loading: true };
    case GET_SIGNAL_TYPES_SUCCESS:
      return {
        ...state,
        signalTypes: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_SIGNAL_TYPES_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_URGENCY_SIGNAL_TYPES:
      return { ...state, loading: true };
    case GET_URGENCY_SIGNAL_TYPES_SUCCESS:
      return {
        ...state,
        urgencySignalTypes: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_URGENCY_SIGNAL_TYPES_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_SIGNALS_FOR_LINEJOBSTATION_TYPES:
      return { ...state, loading: true };
    case GET_SIGNALS_FOR_LINEJOBSTATION_SUCCESS:
      return {
        ...state,
        lineJobStationSignals: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_SIGNALS_FOR_LINEJOBSTATION_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case SHOW_OPERATOR_DRAWINGS_ANNOTATIONS:
      return {
        ...state,
        isShowed: action.payload,
      };
    case GET_OPERATOR_STATION_BOMS:
      return { ...state, loading: true };
    case GET_OPERATOR_STATION_BOMS_SUCCESS:
      return {
        ...state,
        stationBOMs: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_OPERATOR_STATION_BOMS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case CLEAR_OPERATOR_DATA:
      return {
        ...state,
        kpi: {},
        jobNotes: [],
        operatorDocuments: [],
        operatorSidebarData: null,
        drawings: [],
        tasks: [],
        unitChecks: [],
        lastOpenedDrawing: '',
        stationBOMs: [],
      };
    default:
      return state;
  }
};
