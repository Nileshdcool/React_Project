import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getLineJobStatuses = () => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: '/api/LineJobStatuses',
      method: 'GET',
      types: [types.GET_LINEJOB_STATUSES, types.GET_LINEJOB_STATUSES_SUCCESS, types.GET_LINEJOB_STATUSES_ERROR],
    },
  });
