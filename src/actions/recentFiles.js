import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getRecentFiles = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobs/${id}/recentFileChanges`,
      method: 'GET',
      types: [types.GET_RECENT_FILES, types.GET_RECENT_FILES_SUCCESS, types.GET_RECENT_FILES_ERROR],
    },
  });

export const getFileData = (id, path) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobs/${id}/recentFileChanges/${path}`,
      method: 'GET',
      types: [types.GET_FILE_DATA, types.GET_FILE_DATA_SUCCESS, types.GET_FILE_DATA_ERROR],
    },
  });
export const moveRecentFile = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/move`,
      method: 'POST',
      types: [types.GET_FILE_DATA, types.GET_FILE_DATA_SUCCESS, types.GET_FILE_DATA_ERROR],
      body
    },
  });

export const updateRecentFilesDrawing = (data) => ({
  type: types.SAVE_RECENT_FILES_DRAWINGS,
  payload: data,
});

export const updateRecentFilesDocument = (data) => ({
  type: types.SAVE_RECENT_FILES_DOCUMENTS,
  payload: data,
});

export const clearRecentFilesData = () => ({
  type: types.CLEAR_RECENT_FILES_DATA
});

export const checkSameFile = (bool, destination) => ({
  destination,
  type: types.CHECK_SAME_FILE,
  payload: bool,
});

export const checkNewVersion = (bool) => ({
  type: types.CHECK_DRAWING_VERSION,
  payload: bool,
});

export const openRecentFilesLoader = (bool) => ({
  type: types.OPEN_RECENT_FILES_LOADER,
  payload: bool,
});

export const setIsNeedToAddAnnotation = (bool) => ({
  type: types.IS_NEED_TO_ADD_ANNOTATION,
  payload: bool,
});

export const setIsPrevFileHasAnnotation = (bool) => ({
  type: types.SET_IS_PREV_FILE_HAS_ANNOTATION,
  payload: bool,
});
