import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getLineUnitChecks = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/unitchecks`,
      method: 'GET',
      types: [types.GET_LINE_UNIT_CHECKS, types.GET_LINE_UNIT_CHECKS_SUCCESS, types.GET_LINE_UNIT_CHECKS_ERROR],
    },
  });


export const getLineJobStationUnitChecks = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/unitchecks/supervisor`,
      method: 'GET',
      types: [
        types.GET_STATION_UNIT_CHECKS,
        types.GET_STATION_UNIT_CHECKS_SUCCESS,
        types.GET_STATION_UNIT_CHECKS_ERROR
      ],
    },
  });


export const getLineJobStationUnitChecksWithoutSettingToRedux = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/unitchecks/supervisor`,
      method: 'GET',
      types: [
        types.GET_STATION_UNIT_CHECKS_WITHOUT_SETTING_TO_REDUX,
        types.GET_STATION_UNIT_CHECKS_WITHOUT_SETTING_TO_REDUX_SUCCESS,
        types.GET_STATION_UNIT_CHECKS_WITHOUT_SETTING_TO_REDUX_ERROR
      ],
    },
  });

export const addNewUnitCheck = (body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobUnitChecks`,
      method: 'POST',
      types: [types.ADD_NEW_UNIT_CHECK, types.ADD_NEW_UNIT_CHECK_SUCCESS, types.ADD_NEW_UNIT_CHECK_ERROR],
      body,
    },
  });

export const updateUnitCheck = (body, id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobUnitChecks/${id}`,
      method: 'PUT',
      types: [types.UPDATE_UNIT_CHECK, types.UPDATE_UNIT_CHECK_SUCCESS, types.UPDATE_UNIT_CHECK_ERROR],
      body,
    },
  });

export const deleteUnitCheck = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobUnitChecks/${id}`,
      method: 'DELETE',
      types: [types.DELETE_UNIT_CHECK, types.DELETE_UNIT_CHECK_SUCCESS, types.DELETE_UNIT_CHECK_ERROR],
    },
  });

export const setIsStationHasUnitChecks = (isHasUnitChecks, id) => ({
  type: types.SET_IS_HAS_STATION_UNIT_CHECKS,
  payload: { isHasUnitChecks, id },
});

export const addUnitCheckToStation = (data) => ({
  type: types.ADD_UNIT_CHECK_TO_STATION,
  payload: data,
});

export const updateWidgetUnitChecks = (data) => ({
  type: types.UPDATE_WIDGET_UNIT_CHECKS,
  payload: data,
});

export const clearUnitChecks = () => ({
  type: types.CLEAR_UNIT_CHECKS,
});

