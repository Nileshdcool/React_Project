import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getLines = () => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: '/api/lines',
      method: 'GET',
      types: [types.GET_LINES, types.GET_LINES_SUCCESS, types.GET_LINES_ERROR],
    },
  });

export const getQueuePositionsPlanner = () => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: '/api/QueuePositions',
      method: 'GET',
      types: [types.GET_QP, types.GET_QP_SUCCESS, types.GET_QP_ERROR],
    },
  });

export const getQueuePositionsSupervisor = () => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: '/api/QueuePositions/supervisor',
      method: 'GET',
      types: [types.GET_QP, types.GET_QP_SUCCESS, types.GET_QP_ERROR],
    },
  });

export const getLineJobsPlanner = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/Lines/${id}/lineJobs/planner`,
      method: 'GET',
      types: [types.GET_LINEJOBS, types.GET_LINEJOBS_SUCCESS, types.GET_LINEJOBS_ERROR],
    },
  });

export const getLineJobsSupervisor = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/Lines/${id}/lineJobs/supervisor`,
      method: 'GET',
      types: [types.GET_LINEJOBS, types.GET_LINEJOBS_SUCCESS, types.GET_LINEJOBS_ERROR],
    },
  });

export const updateLineJobQueue = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/queuePosition`,
      method: 'PUT',
      types: [types.UPDATE_LINEJOB_QUEUE, types.UPDATE_LINEJOB_QUEUE_SUCCESS, types.UPDATE_LINEJOB_QUEUE_ERROR],
      body,
    },
  });
