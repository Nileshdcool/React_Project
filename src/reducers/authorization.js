import {
  GET_USER_AUTH_ROLES,
  GET_USER_AUTH_ROLES_SUCCESS,
  GET_USER_AUTH_ROLES_ERROR,
} from '../constants/actionCreators';

const INITIAL_STATE = {
  loading: false,
  error: '',
  userRoles: null,
};

export const authorization = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_USER_AUTH_ROLES:
      return { ...state, loading: true };
    case GET_USER_AUTH_ROLES_SUCCESS:
      return {
        ...state,
        userRoles: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_USER_AUTH_ROLES_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};
