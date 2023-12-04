import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const operatorAuth = body => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/Authorization/login`,
      method: 'POST',
      types: [
        types.OPERATOR_AUTH,
        types.OPERATOR_AUTH_SUCCESS,
        types.OPERATOR_AUTH_ERROR
      ],
      body
    },
  });
export const getUserAuthRoles = () => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/Authorization/roles`,
      method: 'GET',
      types: [
        types.GET_USER_AUTH_ROLES,
        types.GET_USER_AUTH_ROLES_SUCCESS,
        types.GET_USER_AUTH_ROLES_ERROR
      ],
    },
  });
