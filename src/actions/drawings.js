import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getLineJobStationDrawings = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/drawings`,
      method: 'GET',
      types: [types.GET_STATION_DRAWINGS, types.GET_STATION_DRAWINGS_SUCCESS, types.GET_STATION_DRAWINGS_ERROR],
    },
  });

export const lineJobStationFilesPreUpload = (body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/savefiles`,
      method: 'PUT',
      types: [
        types.STATION_DRAWINGS_PREUPLOAD,
        types.STATION_DRAWINGS_PREUPLOAD_SUCCESS,
        types.STATION_DRAWINGS_PREUPLOAD_ERROR
      ],
      body
    },
  });

export const lineJobStationSaveFile = (lineJobId, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${lineJobId}/keepFiles`,
      method: 'POST',
      types: [
        types.STATION_DRAWINGS_SAVE_FILE,
        types.STATION_DRAWINGS_SAVE_FILE_SUCCESS,
        types.STATION_DRAWINGS_SAVE_FILE_ERROR
      ],
      body
    },
  });

export const saveSupervisorDrawings = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobStations/${id}/drawings`,
      method: 'PUT',
      types: [types.SAVE_SUPERVISOR_DRAWINGS, types.SAVE_SUPERVISOR_DRAWINGS_SUCCESS, types.SAVE_SUPERVISOR_DRAWINGS_ERROR],
      body
    },
  });

export const updateLineJobStationDrawings = (data) => ({
  type: types.UPDATE_STATION_DRAWINGS,
  payload: data,
});

export const addDrawingsToStaton = (data) => ({
  type: types.ADD_DRAWINGS_TO_STATION,
  payload: data,
});

export const removeDrawingsToStaton = (data) => ({
  type: types.REMOVE_DRAWINGS_FROM_STATION,
  payload: data,
});

export const clearStationDrawings = (data) => ({
  type: types.CLEAR_STATION_DRAWINGS,
});

export const updateModifiedDrawingsFiles = (data) => ({
  type: types.UPDATE_MODIFIED_DRAWINGS_FILES,
  payload: data,
});

