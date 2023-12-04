import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getSupervisorLineJobITPs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/itps`,
      method: 'GET',
      types: [
        types.GET_SUPERVISOR_LINEJOB_ITPS,
        types.GET_SUPERVISOR_LINEJOB_ITPS_SUCCESS,
        types.GET_SUPERVISOR_LINEJOB_ITPS_ERROR,
      ],
    },
  });


export const getLineJobStationITPs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/itps`,
      method: 'GET',
      types: [
        types.GET_STATION_ITPS,
        types.GET_STATION_ITPS_SUCCESS,
        types.GET_STATION_ITPS_ERROR,
      ],
    },
  });


export const getLineJobStationITPsWithoutSettingToRedux = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/itps`,
      method: 'GET',
      types: [
        types.GET_STATION_ITPS_WITHOUT_SETTING_TO_REDUX,
        types.GET_STATION_ITPS_WITHOUT_SETTING_TO_REDUX_SUCCESS,
        types.GET_STATION_ITPS_WITHOUT_SETTING_TO_REDUX_ERROR,
      ],
    },
  });

export const setIsStationHasITPs = (isHasITPs, id) => ({
  type: types.SET_IS_HAS_STATION_ITPS,
  payload: { isHasITPs, id },
});

export const addITPToStation = (data) => ({
  type: types.ADD_ITP_TO_STATION,
  payload: data,
});

export const updateWidgetITPs = (data) => ({
  type: types.UPDATE_WIDGET_ITPS,
  payload: data,
});

export const clearITPs = () => ({
  type: types.CLEAR_ITPS,
});
