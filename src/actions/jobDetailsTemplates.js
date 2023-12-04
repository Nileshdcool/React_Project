import * as types from '../constants/actionCreators';

import { CALL_API } from '../api';

export const getTemplates = (lineId) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lines/${lineId}/templates`,
      method: 'GET',
      types: [types.GET_TEMPLATES, types.GET_TEMPLATES_SUCCESS, types.GET_TEMPLATES_ERROR],
    },
  });

export const createTemplate = (lineJobId, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobs/${lineJobId}/create-template`,
      method: 'POST',
      types: [types.CREATE_TEMPLATE, types.CREATE_TEMPLATE_SUCCESS, types.CREATE_TEMPLATE_ERROR],
      body,
    },
  });

export const applyTemplate = (lineJobId, templateId, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobs/${lineJobId}/apply-template/${templateId}`,
      method: 'POST',
      types: [types.APPLY_TEMPLATE, types.APPLY_TEMPLATE_SUCCESS, types.APPLY_TEMPLATE_ERROR],
      body,
    },
  });
export const onDeleteTemplate = (lineJobId, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/lineJobs/${lineJobId}/delete-template`,
      method: 'POST',
      types: [types.DELETE_TEMPLATE, types.DELETE_TEMPLATE_SUCCESS, types.DELETE_TEMPLATE_ERROR],
      body,
    },
  });
