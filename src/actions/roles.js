import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const changeView = (data) => ({
  type: types.CHANGE_VIEW,
  payload: data,
});
