import {
  GET_LINEJOBS,
  GET_LINEJOBS_ERROR,
  GET_LINEJOBS_SUCCESS,
  GET_LINEJOB_DETAILS,
  GET_LINEJOB_DETAILS_ERROR,
  GET_LINEJOB_DETAILS_SUCCESS,
  GET_LINES,
  GET_LINES_ERROR,
  GET_LINES_SUCCESS,
  GET_QP,
  GET_QP_ERROR,
  GET_QP_SUCCESS,
  UPDATE_LINEJOB_QUEUE,
  UPDATE_LINEJOB_QUEUE_ERROR,
  UPDATE_LINEJOB_QUEUE_SUCCESS,
} from '../constants/actionCreators';

import { LINES } from '../constants'

const INITIAL_STATE = {
  linesList: [],
  lineJobs: [],
  newlineJobs: [],
  createdlineJobs: [],
  stagedlineJobs: [],
  activelineJobs: [],
  lineJobDetails: null,
  queuePositions: [],
  loading: false,
  linesLoading: false,
  error: {},
};
export const lines = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_LINES:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LINES_SUCCESS:
      return {
        ...state,
        linesList: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINES_ERROR:
      return {
        ...state,
        error: action,
        loading: false,
        success: false,
      };
    case GET_QP:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_QP_SUCCESS:
      return {
        ...state,
        queuePositions: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_QP_ERROR:
      return {
        ...state,
        error: action,
        loading: false,
        success: false,
      };
    case GET_LINEJOBS:
      return { ...state, linesLoading: true };
    case GET_LINEJOBS_ERROR:
      return {
        ...state,
        error: action,
        linesLoading: false,
        success: false,
      };
    case GET_LINEJOBS_SUCCESS:
      return {
        ...state,
        lineJobs: action.payload,
        newlineJobs: action.payload.filter(item => item.queuePosition.name === LINES.NEW),
        createdlineJobs: action.payload.filter(item => item.queuePosition.name === LINES.CREATED),
        stagedlineJobs: action.payload.filter(item => item.queuePosition.name === LINES.STAGED),
        activelineJobs: action.payload.filter(item => item.queuePosition.name === LINES.ACTIVE),
        linesLoading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOB_DETAILS:
      return { ...state, loading: true };
    case GET_LINEJOB_DETAILS_ERROR:
      return {
        ...state,
        error: action,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_DETAILS_SUCCESS:
      return {
        ...state,
        lineJobDetails: {
          ...action.payload,
          inProgress: !!state.lineJobs.length && state.lineJobs.find(item => item.id === action.payload.id).inProgress,
        },
        loading: false,
        success: true,
        error: '',
      };
    case UPDATE_LINEJOB_QUEUE:
      return { ...state, loading: false };
    case UPDATE_LINEJOB_QUEUE_ERROR:
      return {
        ...state,
        error: action,
        loading: false,
        success: false,
      };
    case UPDATE_LINEJOB_QUEUE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    default:
      return state;
  }
};
