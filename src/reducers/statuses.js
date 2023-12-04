import {
  GET_LINEJOB_STATUSES,
  GET_LINEJOB_STATUSES_ERROR,
  GET_LINEJOB_STATUSES_SUCCESS,
  UPDATE_LINEJOB_STATUS,
  UPDATE_LINEJOB_STATUS_ERROR,
  UPDATE_LINEJOB_STATUS_SUCCESS,
} from '../constants/actionCreators';

const INITIAL_STATE = {
  jobStatuses: [],
  loading: false,
  error: '',
};
export const jobStatuses = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_LINEJOB_STATUSES:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LINEJOB_STATUSES_SUCCESS:
      return {
        ...state,
        jobStatuses: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOB_STATUSES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case UPDATE_LINEJOB_STATUS:
      return { ...state, loading: true };
    case UPDATE_LINEJOB_STATUS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case UPDATE_LINEJOB_STATUS_SUCCESS:
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
