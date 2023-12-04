import {
  GET_LAST_REVISIONS,
  GET_LAST_REVISIONS_ERROR,
  GET_LAST_REVISIONS_SUCCESS,
  GET_LINEJOB_REVISED_ELEMENT_TYPES,
  GET_LINEJOB_REVISED_ELEMENT_TYPES_ERROR,
  GET_LINEJOB_REVISED_ELEMENT_TYPES_SUCCESS,
  GET_LINEJOB_REVISION_NOTIFICATION,
  GET_LINEJOB_REVISION_NOTIFICATION_ERROR,
  GET_LINEJOB_REVISION_NOTIFICATION_SUCCESS,
  GET_STATIONS_NOTIFICATIONS,
  GET_STATIONS_NOTIFICATIONS_ERROR,
  GET_STATIONS_NOTIFICATIONS_SUCCESS,
  GET_STATION_REVISED_ELEMENT_TYPE,
  GET_STATION_REVISED_ELEMENT_TYPE_ERROR,
  GET_STATION_REVISED_ELEMENT_TYPE_SUCCESS,
  MARK_NOTIFICATION_AS_READ_OPERATOR,
  MARK_NOTIFICATION_AS_READ_OPERATOR_SUCCESS,
  MARK_NOTIFICATION_AS_READ_OPERATOR_ERROR,
  SEND_ISSUE_REVISION,
  SEND_ISSUE_REVISION_ERROR,
  SEND_ISSUE_REVISION_SUCCESS,
  UPDATE_STATION_NOTIFICATIONS_LIST,
  VIEW_NOTIFICATIONS_MODAL,
  VIEW_NOTIFICATIONS_MODAL_ERROR,
  VIEW_NOTIFICATIONS_MODAL_SUCCESS,
  VIEW_NOTIFICATIONS_MODAL_AS_OPERATOR,
  VIEW_NOTIFICATIONS_MODAL_AS_OPERATOR_SUCCESS,
  VIEW_NOTIFICATIONS_MODAL_AS_OPERATOR_ERROR,
  CLEAR_REVISION_NOTIFICATIONS,
  CLEAR_REVISION_NOTIFICATION_DATE,
  GET_OPERATOR_REVISION_NOTIFICATION,
  GET_OPERATOR_REVISION_NOTIFICATION_SUCCESS,
  GET_OPERATOR_REVISION_NOTIFICATION_ERROR,
  GET_SUPERVISOR_REVISION_NOTIFICATION,
  GET_SUPERVISOR_REVISION_NOTIFICATION_SUCCESS,
  GET_SUPERVISOR_REVISION_NOTIFICATION_ERROR,
  UPDATE_SUPERVISOR_NOTIFICATIONS_LIST,
  CLEAR_MONITOR_REVISION_NOTIFICATIONS,
  SET_LINEJOB_STATION_DELETED_NOTIFICATION,
} from '../constants/actionCreators';

import uniq from 'lodash/uniq';
import {uniqBy} from "lodash";

const INITIAL_STATE = {
  lineJobNotifications: [],
  lineJobModalNotifications: [],
  monitorNotifications: [],
  monitorModalModalNotifications: [],
  operatorNotifications: [],
  operatorModalModalNotifications: [],
  stationNotifications: [],
  stationNotificationsTypes: [],
  notificationDate: '',
  stationRevisionTypes: [],
  lineJobRevisionTypes: [],
  modalOperatorRevisionNotifications: [],
  operatorNotificationsTypes: [],
  stationNotificationsSet: [],
  lastNotifications: [],
  loading: false,
  deletedStationData: null,
  error: '',
};
export const issueRevision = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_LINEJOB_REVISED_ELEMENT_TYPES:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LINEJOB_REVISED_ELEMENT_TYPES_SUCCESS:
      return {
        ...state,
        lineJobRevisionTypes: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOB_REVISED_ELEMENT_TYPES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_LAST_REVISIONS:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LAST_REVISIONS_SUCCESS:
      return {
        ...state,
        lastNotifications: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LAST_REVISIONS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_STATION_REVISED_ELEMENT_TYPE:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_STATION_REVISED_ELEMENT_TYPE_SUCCESS:
      return {
        ...state,
        stationRevisionTypes: action.payload.map(item => item.name),
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATION_REVISED_ELEMENT_TYPE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_REVISION_NOTIFICATION:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LINEJOB_REVISION_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationDate: !!action.payload.length ? action.payload[0].createdDateTime : '',
        lineJobNotifications: action.payload,
        lineJobModalNotifications: action.payload.filter(item => !item.viewed),
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOB_REVISION_NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_OPERATOR_REVISION_NOTIFICATION:
      return {
        ...state,
        modalOperatorRevisionNotifications: [],
        error: false,
        loading: true,
        success: false,
      };
    case GET_OPERATOR_REVISION_NOTIFICATION_SUCCESS:
      return {
        ...state,
        operatorNotifications: action.payload,
        operatorModalModalNotifications: action.payload.filter(item => !item.viewedOperator),
        operatorNotificationsTypes: uniq(action.payload.map(item => item.revisedElementType.name)),
        loading: false,
        success: true,
        error: '',
      };
    case GET_OPERATOR_REVISION_NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_SUPERVISOR_REVISION_NOTIFICATION:
      return {
        ...state,
        modalOperatorRevisionNotifications: [],
        error: false,
        loading: true,
        success: false,
      };
    case GET_SUPERVISOR_REVISION_NOTIFICATION_SUCCESS:
      return {
        ...state,
        monitorNotifications: uniqBy([...state.monitorNotifications, ...action.payload], 'id'),
        monitorModalModalNotifications: uniqBy([
          ...state.monitorModalModalNotifications,
          ...action.payload.filter(item => !item.viewedSupervisor)
        ], 'id'),
        loading: false,
        success: true,
        error: '',
      };
    case GET_SUPERVISOR_REVISION_NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case CLEAR_MONITOR_REVISION_NOTIFICATIONS:
      return {
        ...state,
        monitorNotifications: [],
        monitorModalModalNotifications: [],
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATIONS_NOTIFICATIONS:
      return {
        ...state,
        modalStationNotifications: [],
        error: false,
        loading: true,
        success: false,
      };
    case GET_STATIONS_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        stationNotificationsSet: [
          ...state.stationNotificationsSet,
          ...action.payload
        ],
        modalStationNotifications: [
          ...state.stationNotificationsSet,
          ...action.payload
        ].filter(item => !item.viewed),
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATIONS_NOTIFICATIONS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case MARK_NOTIFICATION_AS_READ_OPERATOR:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case MARK_NOTIFICATION_AS_READ_OPERATOR_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case MARK_NOTIFICATION_AS_READ_OPERATOR_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case VIEW_NOTIFICATIONS_MODAL:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case VIEW_NOTIFICATIONS_MODAL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case VIEW_NOTIFICATIONS_MODAL_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case VIEW_NOTIFICATIONS_MODAL_AS_OPERATOR:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case VIEW_NOTIFICATIONS_MODAL_AS_OPERATOR_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case VIEW_NOTIFICATIONS_MODAL_AS_OPERATOR_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case SEND_ISSUE_REVISION:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case SEND_ISSUE_REVISION_SUCCESS:
      return {
        ...state,
        notificationDate: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case SEND_ISSUE_REVISION_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case UPDATE_STATION_NOTIFICATIONS_LIST:
      return {
        ...state,
        modalStationNotifications: action.payload.filter(item => !item.viewed),
        loading: false,
        success: true,
        error: '',
      }
    case UPDATE_SUPERVISOR_NOTIFICATIONS_LIST:
      return {
        ...state,
        lineJobModalNotifications: action.payload.filter(item => !item.viewed),
        loading: false,
        success: true,
        error: '',
      }
    case CLEAR_REVISION_NOTIFICATIONS:
      return {
        ...state,
        modalStationNotifications: [],
        loading: false,
        success: true,
        error: '',
      }
    case CLEAR_REVISION_NOTIFICATION_DATE:
      return {
        ...state,
        notificationDate: '',
        loading: false,
        success: true,
        error: '',
      }
    case SET_LINEJOB_STATION_DELETED_NOTIFICATION:
      return {
        ...state,
        deletedStationData: action.payload,
      }
    default:
      return state;
  }
};
