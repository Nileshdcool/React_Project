import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getLinejobVDRs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/External/getVdrsByLineJobId/${id}`,
      method: 'GET',
      types: [types.GET_LINEJOB_VDRS, types.GET_LINEJOB_VDRS_SUCCESS, types.GET_LINEJOB_VDRS_ERROR],
    },
  });


export const getLineJobStationVDRs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/vdrs`,
      method: 'GET',
      types: [
        types.GET_STATION_VDRS,
        types.GET_STATION_VDRS_SUCCESS,
        types.GET_STATION_VDRS_ERROR,
      ],
    },
  });


export const getLineJobStationVDRsWithoutSettingToRedux = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/vdrs`,
      method: 'GET',
      types: [
        types.GET_STATION_VDRS_WITHOUT_SETTING_TO_REDUX,
        types.GET_STATION_VDRS_WITHOUT_SETTING_TO_REDUX_SUCCESS,
        types.GET_STATION_VDRS_WITHOUT_SETTING_TO_REDUX_ERROR,
      ],
    },
  });

export const setIsStationHasVDRs = (isHasVDRs, id) => ({
  type: types.SET_IS_HAS_STATION_VDRS,
  payload: { isHasVDRs, id },
});

export const addVDRToStation = (data) => ({
  type: types.ADD_VDR_TO_STATION,
  payload: data,
});

export const updateWidgetVDRs = (data) => ({
  type: types.UPDATE_WIDGET_VDRS,
  payload: data,
});

export const clearVDRs = () => ({
  type: types.CLEAR_VDRS,
});
