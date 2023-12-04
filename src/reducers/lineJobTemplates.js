import {
  GET_TEMPLATES,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_ERROR,
} from '../constants/actionCreators';

const INITIAL_STATE = {
  templates: [],
  loading: false,
  error: '',
};
export const lineJobTemplates = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_TEMPLATES:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_TEMPLATES_SUCCESS:
      return {
        ...state,
        templates: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_TEMPLATES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};
