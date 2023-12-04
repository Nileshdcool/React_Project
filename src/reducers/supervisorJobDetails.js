import {
  ADD_BOMS_TO_STATION,
  ADD_ITP_TO_STATION,
  ADD_TASKS_TO_STATION,
  ADD_UNIT_CHECK_TO_STATION,
  ADD_VDR_TO_STATION,
  CLEAR_ADDED_STATION_BOMS,
  CLEAR_ADDED_STATION_TASKS,
  CLEAR_ITPS,
  CLEAR_LINEJOB_STATIONS_DATA,
  CLEAR_LINEJOB_STATIONS_WIDGETS_DATA,
  CLEAR_LINEJOB_TASKS,
  CLEAR_STATION_BOMS,
  CLEAR_UNIT_CHECKS,
  CLEAR_VDRS,
  DELETE_LINEJOB_STATIONS,
  DELETE_LINEJOB_STATIONS_ERROR,
  DELETE_LINEJOB_STATIONS_SUCCESS,
  GET_CHOOSED_LINEJOB_BOMS,
  GET_CHOOSED_LINEJOB_BOMS_ERROR,
  GET_CHOOSED_LINEJOB_BOMS_SUCCESS,
  GET_LINEJOBSTATION_ID,
  GET_LINEJOB_STATIONS,
  GET_LINEJOB_STATIONS_ERROR,
  GET_LINEJOB_STATIONS_SUCCESS,
  GET_LINEJOB_STATIONS_WITH_DETAILS,
  GET_LINEJOB_STATIONS_WITH_DETAILS_ERROR,
  GET_LINEJOB_STATIONS_WITH_DETAILS_SUCCESS,
  GET_LINEJOB_TASKS,
  GET_LINEJOB_TASKS_ERROR,
  GET_LINEJOB_TASKS_SUCCESS,
  GET_LINEJOB_VDRS,
  GET_LINEJOB_VDRS_ERROR,
  GET_LINEJOB_VDRS_SUCCESS,
  GET_LINE_STATIONS,
  GET_LINE_STATIONS_ERROR,
  GET_LINE_STATIONS_SUCCESS,
  GET_LINE_UNIT_CHECKS,
  GET_LINE_UNIT_CHECKS_ERROR,
  GET_LINE_UNIT_CHECKS_SUCCESS,
  GET_STATION_BOMS,
  GET_STATION_BOMS_ERROR,
  GET_STATION_BOMS_SUCCESS,
  GET_STATION_DETAILS,
  GET_STATION_DETAILS_ERROR,
  GET_STATION_DETAILS_SUCCESS,
  SET_STATION_DETAILS,
  GET_STATION_DOCUMENTS,
  GET_STATION_DOCUMENTS_ERROR,
  GET_STATION_DOCUMENTS_SUCCESS,
  GET_STATION_ITPS,
  GET_STATION_ITPS_ERROR,
  GET_STATION_ITPS_SUCCESS,
  GET_STATION_TASKS,
  GET_STATION_TASKS_ERROR,
  GET_STATION_TASKS_SUCCESS,
  GET_STATION_UNIT_CHECKS,
  GET_STATION_UNIT_CHECKS_ERROR,
  GET_STATION_UNIT_CHECKS_SUCCESS,
  GET_STATION_VDRS,
  GET_STATION_VDRS_ERROR,
  GET_STATION_VDRS_SUCCESS,
  GET_SUPERVISOR_LINEJOB_ITPS,
  GET_SUPERVISOR_LINEJOB_ITPS_ERROR,
  GET_SUPERVISOR_LINEJOB_ITPS_SUCCESS,
  REMOVE_TASKS_FROM_STATION,
  SAVE_LINEJOB_STATIONS,
  SAVE_LINEJOB_STATIONS_ERROR,
  SAVE_LINEJOB_STATIONS_SUCCESS,
  SAVE_NOTES,
  SAVE_NOTES_ERROR,
  SAVE_NOTES_SUCCESS,
  SET_BOMS_TO_STATION,
  SET_DRAWINGS_TO_LINEJOBSTATION,
  SET_INITIAL_STATION_BOMS,
  SET_IS_HAS_STATION_ITPS,
  SET_IS_HAS_STATION_UNIT_CHECKS,
  SET_IS_HAS_STATION_VDRS,
  SET_LINEJOBSTATION_TASKS,
  UPDATE_LINEJOB_STATION_TASKS,
  UPDATE_LINE_TASKS,
  UPDATE_STATION_DOCUMENTS,
  UPDATE_STATION_TASKS,
  UPDATE_SUPERVISOR_BOMS,
  UPDATE_WIDGET_ITPS,
  UPDATE_WIDGET_UNIT_CHECKS,
  UPDATE_WIDGET_VDRS,
} from '../constants/actionCreators';

import { FIRST_ARTICLE } from '../constants';
import uniqBy from 'lodash/uniqBy';

const INITIAL_STATE = {
  lineStations: [],
  lineJobStations: [],
  loading: false,
  error: '',
  lineJobStationsDocuments: [],
  lineJobStationsDocumentsList: [],
  lineJobStationsTasksList: [],
  lineJobStationTasks: [],
  lineTasks: [],
  stationTasks: [],
  supervisorLineBOMs: [],
  checkedSupervisorLineBOMs: [],
  addedStationsBoms: [],
  setStationsBoms: [],
  lineJobStationsBOMsList: [],
  stationBOMs: [],
  initialStationBOMs: [],
  lineJobUnitChecks: [],
  widgetUnitChecks: [],
  lineJobVDRs: [],
  widgetVDRs: [],
  supervisorLineJobITPs: [],
  widgetITPs: [],
  createdStationId: '',
  widgetFA: [],
};

export const supervisorJobDetails = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_LINE_STATIONS:
      return { ...state, loading: true };
    case GET_LINE_STATIONS_SUCCESS:
      return {
        ...state,
        lineStations: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINE_STATIONS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_STATION_TASKS:
      return { ...state, loading: true };
    case GET_STATION_TASKS_SUCCESS:
      return {
        ...state,
        lineJobStationTasks: uniqBy([...state.lineJobStationTasks, ...action.payload], 'id'),
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATION_TASKS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_STATION_BOMS:
      return { ...state, loading: true };
    case GET_STATION_BOMS_SUCCESS:
      return {
        ...state,
        stationBOMs: [...state.stationBOMs, ...action.payload],
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATION_BOMS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_TASKS:
      return { ...state, loading: true };
    case GET_LINEJOB_TASKS_SUCCESS:
      return {
        ...state,
        lineTasks: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOB_TASKS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_STATIONS:
      return { ...state, loading: true };
    case GET_LINEJOB_STATIONS_SUCCESS:
      return {
        ...state,
        lineJobStations: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOB_STATIONS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_STATIONS_WITH_DETAILS:
      return { ...state, loading: true };
      case GET_LINEJOB_STATIONS_WITH_DETAILS_SUCCESS:
        return {
          ...state,
          lineJobStations: action.payload.map(lineJob => ({
            ...lineJob,
            lineJobStationsDrawingsList: lineJob.details.drawings,
            lineJobStationsDocumentsList: lineJob.details.documents,
            isStationHasUnitChecks: lineJob.details.unitChecks.length > 1,
            isStationHasVDRs: lineJob.details.vdrs.length > 0,
            isStationHasITPs: lineJob.details.itps.length > 0,
            lineJobStationsTasksList: lineJob.details.tasks,
          })),
          setStationsBoms: [...state.setStationsBoms, ...action.payload.map(lineJob => lineJob.details.boms).flat()],
          lineJobStationsDocuments: action.payload.map(lineJob => lineJob.details.documents.map(((doc, i) => ({
            ...doc,
            value: i + 1,
            isChecked: false,
          })))),
          lineJobStationsDocumentsList: [
            ...state.lineJobStationsDocumentsList,
            ...action.payload.map(lineJob => lineJob.details.documents),
          ],
          lineJobStationTasks: uniqBy([...state.lineJobStationTasks, ...action.payload.map(lineJob => lineJob.details.tasks)].flat(), 'id'),
          stationBOMs: [...state.stationBOMs, ...action.payload.map(lineJob => lineJob.details.boms).flat()],
          loading: false,
          success: true,
          error: '',
        };
    case GET_LINEJOB_STATIONS_WITH_DETAILS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_CHOOSED_LINEJOB_BOMS:
      return { ...state, loading: true };
    case GET_CHOOSED_LINEJOB_BOMS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_CHOOSED_LINEJOB_BOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
        supervisorLineBOMs: action.payload,
        checkedSupervisorLineBOMs: action.payload.map((bom) => ({
          ...bom,
          isCheckedForStation: false,
        })),
      };
    case UPDATE_SUPERVISOR_BOMS:
      return {
        ...state,
        checkedSupervisorLineBOMs: action.payload,
      };
    case GET_STATION_DETAILS:
      return { ...state, loading: true };
    case GET_STATION_DETAILS_SUCCESS:
      return {
        ...state,
        lineJobStationsDocuments: action.payload.documents.map((doc, i) => ({
          ...doc,
          value: i + 1,
          isChecked: false,
        })),
        lineJobStationsDocumentsList: [
          ...state.lineJobStationsDocumentsList,
          action.payload.documents,
        ],
        lineJobStationTasks: uniqBy([...state.lineJobStationTasks, ...action.payload.tasks], 'id'),
        stationBOMs: [...state.stationBOMs, ...action.payload.boms],
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATION_DETAILS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case SET_STATION_DETAILS:
      return {
        ...state,
        lineJobStations: state.lineJobStations.map(lineJob => {
          if (lineJob.id === action.payload.id) {
            return {
              ...lineJob,
              lineJobStationsDrawingsList: action.payload.details.drawings,
              lineJobStationsDocumentsList: action.payload.details.documents,
              isStationHasUnitChecks: action.payload.details.unitChecks.length > 1,
              isStationHasVDRs: action.payload.details.vdrs.length > 0,
              isStationHasITPs: action.payload.details.itps.length > 0,
              lineJobStationsTasksList: action.payload.details.tasks,
            };
          }
          return lineJob;
        }),
        setStationsBoms: [...state.setStationsBoms, ...action.payload.details.boms],
      };
    case GET_STATION_DOCUMENTS:
      return { ...state, loading: true };
    case GET_STATION_DOCUMENTS_SUCCESS:
      return {
        ...state,
        lineJobStationsDocuments: action.payload.map((doc, i) => ({
          ...doc,
          value: i + 1,
          isChecked: false,
        })),
        lineJobStationsDocumentsList: [
          ...state.lineJobStationsDocumentsList,
          action.payload,
        ],
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATION_DOCUMENTS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_LINE_UNIT_CHECKS:
      return { ...state, loading: true };
    case GET_LINE_UNIT_CHECKS_SUCCESS:
      return {
        ...state,
        lineJobUnitChecks: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINE_UNIT_CHECKS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_STATION_UNIT_CHECKS:
      return { ...state, loading: true };
    case GET_STATION_UNIT_CHECKS_SUCCESS:
      return {
        ...state,
        widgetUnitChecks: action.payload.map((item, index) => ({ ...item, sortIndex: index })),
        widgetFA: action.payload.filter(item => item.text === FIRST_ARTICLE),
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATION_UNIT_CHECKS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case SET_IS_HAS_STATION_UNIT_CHECKS:
      return {
        ...state,
        lineJobStations: [
          ...state.lineJobStations.filter(linejob => linejob.id !== action.payload.id),
          {
            ...state.lineJobStations.find(linejob => linejob.id === action.payload.id),
            isStationHasUnitChecks: action.payload.isHasUnitChecks,
          },
        ],
      };
    case ADD_UNIT_CHECK_TO_STATION:
      return {
        ...state,
        widgetUnitChecks: action.payload.widgetUnitChecks,
      };
    case UPDATE_WIDGET_UNIT_CHECKS:
      return {
        ...state,
        widgetUnitChecks: action.payload,
      };
    case GET_LINEJOB_VDRS:
      return { ...state, loading: true };
    case GET_LINEJOB_VDRS_SUCCESS:
      return {
        ...state,
        lineJobVDRs: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOB_VDRS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_STATION_VDRS:
      return { ...state, loading: true };
    case GET_STATION_VDRS_SUCCESS:
      return {
        ...state,
        widgetVDRs: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATION_VDRS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case SET_IS_HAS_STATION_VDRS:
      return {
        ...state,
        lineJobStations: [
          ...state.lineJobStations.filter(linejob => linejob.id !== action.payload.id),
          {
            ...state.lineJobStations.find(linejob => linejob.id === action.payload.id),
            isStationHasVDRs: action.payload.isHasVDRs,
          },
        ],
      };

    case ADD_VDR_TO_STATION:
      return {
        ...state,
        widgetVDRs: action.payload.widgetVDRs,
      };
    case UPDATE_WIDGET_VDRS:
      return {
        ...state,
        widgetVDRs: action.payload,
      };
    case GET_SUPERVISOR_LINEJOB_ITPS:
      return { ...state, loading: true };
    case GET_SUPERVISOR_LINEJOB_ITPS_SUCCESS:
      return {
        ...state,
        supervisorLineJobITPs: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_SUPERVISOR_LINEJOB_ITPS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_STATION_ITPS:
      return { ...state, loading: true };
    case GET_STATION_ITPS_SUCCESS:
      return {
        ...state,
        widgetITPs: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATION_ITPS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case SET_IS_HAS_STATION_ITPS:
      return {
        ...state,
        lineJobStations: [
          ...state.lineJobStations.filter(linejob => linejob.id !== action.payload.id),
          {
            ...state.lineJobStations.find(linejob => linejob.id === action.payload.id),
            isStationHasITPs: action.payload.isHasITPs,
          },
        ],
      };

    case ADD_ITP_TO_STATION:
      return {
        ...state,
        widgetITPs: action.payload.widgetITPs,
      };
    case UPDATE_WIDGET_ITPS:
      return {
        ...state,
        widgetITPs: action.payload,
      };
    case GET_LINEJOBSTATION_ID:
      return {
        ...state,
        lineJobStations: [
          ...state.lineJobStations.filter(linejob => linejob.id !== action.payload.id),
          {
            ...state.lineJobStations.find(linejob => linejob.id === action.payload.id),
            lineJobStationsDocumentsList: action.payload.documents,
          },
        ],
      };

    case SET_DRAWINGS_TO_LINEJOBSTATION:
      return {

        ...state,
        lineJobStations: state.lineJobStations.map(lineJob => {
          if (lineJob.id === action.payload.id) {
            return {
              ...lineJob,
              lineJobStationsDrawingsList: action.payload.drawings
            };
          }
          return lineJob;
        }),
      };

    case ADD_TASKS_TO_STATION:
      return {
        ...state,
        stationTasks: uniqBy([...state.lineJobStationTasks, ...action.payload.stationTasks], 'id'),
        lineTasks: action.payload.lineTasks
          .map(task => (task.id === action.payload.id ? { ...task, isChecked: true } : task)),
      };
    case REMOVE_TASKS_FROM_STATION:
      return {
        ...state,
        lineJobStations: [
          ...state.lineJobStations.filter(linejob => linejob.id !== action.payload.lineJobStationId),
          {
            ...state.lineJobStations.find(linejob => linejob.id === action.payload.lineJobStationId),
            lineJobStationsTasksList: action.payload.lineJobStationTasks,
          },
        ],
        lineJobStationTasks: action.payload.lineJobStationTasks || state.lineJobStationTasks,
        stationTasks: action.payload.stationTasks || state.stationTasks,
        lineTasks: state.lineTasks
          .map(task => (task.id === action.payload.id ? { ...task, isChecked: false } : task)),
      };
    case UPDATE_LINE_TASKS:
      return {
        ...state,
        lineTasks: action.payload,
      };
    case SET_LINEJOBSTATION_TASKS:
      return {
        ...state,
        lineJobStations: [
          ...state.lineJobStations.filter(linejob => linejob.id !== action.payload.id),
          {
            ...state.lineJobStations.find(linejob => linejob.id === action.payload.id),
            lineJobStationsTasksList: action.payload.tasks,
          },
        ],
      };
    case UPDATE_STATION_DOCUMENTS:
      return {
        ...state,
        lineJobStationsDocuments: action.payload,
      };
    case UPDATE_LINEJOB_STATION_TASKS:
      return {
        ...state,
        lineJobStationTasks: action.payload,
      };
    case UPDATE_STATION_TASKS:
      return {
        ...state,
        stationTasks: action.payload,
      };
    case SAVE_LINEJOB_STATIONS:
      return { ...state, loading: true };
    case SAVE_LINEJOB_STATIONS_SUCCESS:
      return {
        ...state,
        createdStationId: action.payload.id,
        loading: false,
        success: true,
        error: '',
      };
    case SAVE_LINEJOB_STATIONS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case DELETE_LINEJOB_STATIONS:
      return { ...state, loading: true };
    case DELETE_LINEJOB_STATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case DELETE_LINEJOB_STATIONS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case SAVE_NOTES:
      return { ...state, loading: true };
    case SAVE_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case SAVE_NOTES_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case ADD_BOMS_TO_STATION:
      return {
        ...state,
        addedStationsBoms: action.payload,
      };
    case SET_INITIAL_STATION_BOMS:
      return {
        ...state,
        initialStationBOMs: action.payload,
      };
    case SET_BOMS_TO_STATION:
      return {
        ...state,
        setStationsBoms: [...state.setStationsBoms, ...action.payload],
      };
    case CLEAR_LINEJOB_STATIONS_DATA:
      return {
        ...state,
        lineJobStations: [],
        lineTasks: [],
        stationTasks: [],
        lineJobStationTasks: [],
        addedStationsBoms: [],
        setStationsBoms: [],
        lineJobUnitChecks: [],
        widgetUnitChecks: [],
        lineJobVDRs: [],
        widgetVDRs: [],
        supervisorLineJobITPs: [],
        widgetITPs: [],
        error: action.description,
        loading: false,
        success: false,
      };
    case CLEAR_LINEJOB_STATIONS_WIDGETS_DATA:
      return {
        ...state,
        lineJobStationsDocuments: [],
        addedStationsBoms: [],
        stationTasks: [],
        lineTasks: [],
        checkedSupervisorLineBOMs: [],
        error: action.description,
        loading: false,
        success: false,
      };
    case CLEAR_LINEJOB_TASKS:
      return {
        ...state,
        stationTasks: [],
        lineJobStationTasks: [],
        error: action.description,
        loading: false,
        success: false,
      };
    case CLEAR_ADDED_STATION_TASKS:
      return {
        ...state,
        stationTasks: [],
      };
    case CLEAR_UNIT_CHECKS:
      return {
        ...state,
        widgetUnitChecks: [],
      };
    case CLEAR_VDRS:
      return {
        ...state,
        widgetVDRs: [],
      };
    case CLEAR_ITPS:
      return {
        ...state,
        widgetITPs: [],
      };
    case CLEAR_ADDED_STATION_BOMS:
      return {
        ...state,
        addedStationsBoms: [],
      };
    case CLEAR_STATION_BOMS:
      return {
        ...state,
        addedStationsBoms: [],
        setStationsBoms: [],
        lineJobStationsBOMsList: [],
        stationBOMs: [],
        initialStationBOMs: [],
      };
    default:
      return state;
  }
};
