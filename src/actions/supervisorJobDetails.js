import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getLineStations = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/Lines/${id}/stations`,
      method: 'GET',
      types: [types.GET_LINE_STATIONS, types.GET_LINE_STATIONS_SUCCESS, types.GET_LINE_STATIONS_ERROR],
    },
  });

export const getLineJobStations = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/lineJobStations`,
      method: 'GET',
      types: [types.GET_LINEJOB_STATIONS, types.GET_LINEJOB_STATIONS_SUCCESS, types.GET_LINEJOB_STATIONS_ERROR],
    },
  });

export const getLineJobStationsWithDetails = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/lineJobStationsWithDetails`,
      method: 'GET',
      types: [
        types.GET_LINEJOB_STATIONS_WITH_DETAILS, 
        types.GET_LINEJOB_STATIONS_WITH_DETAILS_SUCCESS, 
        types.GET_LINEJOB_STATIONS_WITH_DETAILS_ERROR
      ],
    },
  });

export const saveLineJobStation = (body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: '/api/lineJobStations',
      method: 'POST',
      types: [types.SAVE_LINEJOB_STATIONS, types.SAVE_LINEJOB_STATIONS_SUCCESS, types.SAVE_LINEJOB_STATIONS_ERROR],
      body,
    },
  });
export const deleteLineJobStation = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}`,
      method: 'DELETE',
      types: [
        types.DELETE_LINEJOB_STATIONS,
        types.DELETE_LINEJOB_STATIONS_SUCCESS,
        types.DELETE_LINEJOB_STATIONS_ERROR,
      ]
    },
  });

export const getLineJobStationDocuments = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/documents`,
      method: 'GET',
      types: [types.GET_STATION_DOCUMENTS, types.GET_STATION_DOCUMENTS_SUCCESS, types.GET_STATION_DOCUMENTS_ERROR],
    },
  });

export const updateLineJobStationDocuments = (data) => ({
  type: types.UPDATE_STATION_DOCUMENTS,
  payload: data,
});
export const updateLineJobStationTasks = (data) => ({
  type: types.UPDATE_LINEJOB_STATION_TASKS,
  payload: data,
});
export const updateLineTasks = (data) => ({
  type: types.UPDATE_LINE_TASKS,
  payload: data,
});

export const saveNotes = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/notes`,
      method: 'POST',
      types: [types.SAVE_NOTES, types.SAVE_NOTES_SUCCESS, types.SAVE_NOTES_ERROR],
      body,
    },
  });

export const getLineJobID = (documents, id) => ({
  type: types.GET_LINEJOBSTATION_ID,
  payload: { documents, id },
});

export const getDrawingsLineJobID = (drawings, id) => ({
  type: types.SET_DRAWINGS_TO_LINEJOBSTATION,
  payload: { drawings, id },
});

export const setLineJobStationTasks = (tasks, id) => ({
  type: types.SET_LINEJOBSTATION_TASKS,
  payload: { tasks, id },
});

export const clearLineJobStationsData = () => ({
  type: types.CLEAR_LINEJOB_STATIONS_DATA,
});

export const clearLineJobStationsWidgetsData = () => ({
  type: types.CLEAR_LINEJOB_STATIONS_WIDGETS_DATA,
});

export const clearStationTasks = () => ({
  type: types.CLEAR_LINEJOB_TASKS,
});

export const addTasksToStation = (data) => ({
  type: types.ADD_TASKS_TO_STATION,
  payload: data,
});

export const removeTasksFromStaton = (data) => ({
  type: types.REMOVE_TASKS_FROM_STATION,
  payload: data,
});

export const addBOMsToStation = (data) => ({
  type: types.ADD_BOMS_TO_STATION,
  payload: data
});
export const setInitialStationBoms = (data) => ({
  type: types.SET_INITIAL_STATION_BOMS,
  payload: data
});
export const clearAddedStationBOMs = () => ({
  type: types.CLEAR_ADDED_STATION_BOMS,
});
export const clearAddedStationTasks = () => ({
  type: types.CLEAR_ADDED_STATION_TASKS,
});
export const clearStationBOMS = () => ({
  type: types.CLEAR_STATION_BOMS,
});
export const setBOMsToStation = (data) => ({
  type: types.SET_BOMS_TO_STATION,
  payload: data
});
export const updateStationTasks = (data) => ({
  type: types.UPDATE_STATION_TASKS,
  payload: data
});

export const getLineJobTasks = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/tasks`,
      method: 'GET',
      types: [types.GET_LINEJOB_TASKS, types.GET_LINEJOB_TASKS_SUCCESS, types.GET_LINEJOB_TASKS_ERROR],
    },
  });

export const getLineJobStationTasks = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/tasks`,
      method: 'GET',
      types: [types.GET_STATION_TASKS, types.GET_STATION_TASKS_SUCCESS, types.GET_STATION_TASKS_ERROR],
    },
  });

export const getLineJobStationBOMs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/boms`,
      method: 'GET',
      types: [types.GET_STATION_BOMS, types.GET_STATION_BOMS_SUCCESS, types.GET_STATION_BOMS_ERROR],
    },
  });


export const createNewTask = (body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: '/api/Tasks',
      method: 'POST',
      types: [types.CREATE_NEW_TASK, types.CREATE_NEW_TASK_SUCCESS, types.CREATE_NEW_TASK_ERROR],
      body,
    },
  });


export const updateTask = (body, id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/Tasks/${id}`,
      method: 'PUT',
      types: [types.UPDATE_TASK, types.UPDATE_TASK_SUCCESS, types.UPDATE_TASK_ERROR],
      body,
    },
  });
export const deleteTask = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/Tasks/${id}`,
      method: 'DELETE',
      types: [types.DELETE_TASK, types.DELETE_TASK_SUCCESS, types.DELETE_TASK_ERROR],
    },
  });

  export const getLineJobStationDetails = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobStations/${id}/details`,
      method: 'GET',
      types: [types.GET_STATION_DETAILS, types.GET_STATION_DETAILS_SUCCESS, types.GET_STATION_DETAILS_ERROR],
    },
  });

  export const setLineJobStationDetails = (details, id) => ({
    type: types.SET_STATION_DETAILS,
    payload: { details, id },
  });
