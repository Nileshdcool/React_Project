import {
  CLEAR_STATION_DRAWINGS,
  GET_STATION_DRAWINGS,
  GET_STATION_DRAWINGS_ERROR,
  GET_STATION_DRAWINGS_SUCCESS,
  SAVE_SUPERVISOR_DRAWINGS,
  SAVE_SUPERVISOR_DRAWINGS_ERROR,
  SAVE_SUPERVISOR_DRAWINGS_SUCCESS,
  UPDATE_STATION_DRAWINGS,
  GET_STATION_DETAILS,
  GET_STATION_DETAILS_SUCCESS,
  GET_STATION_DETAILS_ERROR
} from '../constants/actionCreators';

const INITIAL_STATE = {
  loading: false,
  error: '',
  lineJobStationsDrawings: [],
};

export const drawings = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_STATION_DETAILS:
      return { ...state, loading: true };
    case GET_STATION_DETAILS_SUCCESS:
      return {
        ...state,
        lineJobStationsDrawings: action.payload.drawings.map((doc, i) => ({
          ...doc,
          value: i + 1,
          isChecked: false,
        })),
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
    case GET_STATION_DRAWINGS:
      return { ...state, loading: true };
    case GET_STATION_DRAWINGS_SUCCESS:
      return {
        ...state,
        lineJobStationsDrawings: action.payload.map((doc, i) => ({
          ...doc,
          value: i + 1,
          isChecked: false,
        })),
        loading: false,
        success: true,
        error: '',
      };
    case GET_STATION_DRAWINGS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case UPDATE_STATION_DRAWINGS:
      return {
        ...state,
        lineJobStationsDrawings: action.payload,
      };
    case SAVE_SUPERVISOR_DRAWINGS:
      return { ...state, loading: true };
    case SAVE_SUPERVISOR_DRAWINGS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case SAVE_SUPERVISOR_DRAWINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case CLEAR_STATION_DRAWINGS:
      return {
        ...state,
        lineJobStationsDrawings: [],
      }
    default:
      return state;
  }
};
