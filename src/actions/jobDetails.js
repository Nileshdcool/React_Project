import * as types from '../constants/actionCreators';
import { CALL_API } from '../api';

export const getLineJobDetails = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}`,
      method: 'GET',
      types: [types.GET_LINEJOB_DETAILS, types.GET_LINEJOB_DETAILS_SUCCESS, types.GET_LINEJOB_DETAILS_ERROR],
    },
  });

export const updateLineJobDetails = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}`,
      method: 'PUT',
      types: [types.UPDATE_LINEJOB_DETAILS, types.UPDATE_LINEJOB_DETAILS_SUCCESS, types.UPDATE_LINEJOB_DETAILS_ERROR],
      body,
    },
  });

export const updateLineJobStatus = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/status`,
      method: 'PUT',
      types: [types.UPDATE_LINEJOB_STATUS, types.UPDATE_LINEJOB_STATUS_SUCCESS, types.UPDATE_LINEJOB_STATUS_ERROR],
      body,
    },
  });

export const getLineJobDocuments = (id) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/documents`,
      method: 'GET',
      types: [types.GET_LINEJOB_DOCUMENTS, types.GET_LINEJOB_DOCUMENTS_SUCCESS, types.GET_LINEJOB_DOCUMENTS_ERROR],
    },
  });

export const getLineJobDrawings = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/drawings`,
      method: 'GET',
      types: [types.GET_LINEJOB_DRAWINGS, types.GET_LINEJOB_DRAWINGS_SUCCESS, types.GET_LINEJOB_DRAWINGS_ERROR],
    },
  });

export const getLineJobBOMs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/boms/all`,
      method: 'GET',
      types: [types.GET_LINEJOB_BOMS, types.GET_LINEJOB_BOMS_SUCCESS, types.GET_LINEJOB_BOMS_ERROR],
    },
  });

export const getChoosedLineJobBOMs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/boms`,
      method: 'GET',
      types: [
        types.GET_CHOOSED_LINEJOB_BOMS,
        types.GET_CHOOSED_LINEJOB_BOMS_SUCCESS,
        types.GET_CHOOSED_LINEJOB_BOMS_ERROR
      ],
    },
  });

export const updateChoseLineJobBOMs = (data) => ({
  type: types.UPDATE_SUPERVISOR_BOMS,
  payload: data,
});

export const handleUnsavedChanges = bool => ({
  type: types.HANDLE_UNSAVED_CHANGES,
  payload: bool
});

export const handleUnsavedChangesInDocuments = bool => ({
  type: types.HANDLE_UNSAVED_CHANGES_IN_DOCUMENTS,
  payload: bool
});

export const handleUnsavedChangesInDrawings = bool => ({
  type: types.HANDLE_UNSAVED_CHANGES_IN_DRAWINGS,
  payload: bool
});

export const handleUnsavedChangesInBOM = bool => ({
  type: types.HANDLE_UNSAVED_CHANGES_IN_BOM,
  payload: bool
});

export const handleUnsavedChangesInNotes = bool => ({
  type: types.HANDLE_UNSAVED_CHANGES_IN_NOTES,
  payload: bool
});

export const handleUnsavedChangesInAnnotations = bool => ({
  type: types.HANDLE_UNSAVED_CHANGES_IN_ANNOTATIONS,
  payload: bool
});

export const handleUnsavedChangesInITPs = bool => ({
  type: types.HANDLE_UNSAVED_CHANGES_IN_ITPS,
  payload: bool
});

export const updateBoms = (data) => ({
  type: types.UPDATE_BOMS,
  payload: data,
});

export const liveUpdateBoms = (data) => ({
  type: types.LIVE_UPDATE_BOMS,
  payload: data,
});

export const uploadLineJobDocuments = (data) => ({
  type: types.UPLOAD_NEW_LINEJOB_DOCUMENTS,
  payload: data,
});

export const updateSavedLineJobDocuments = (data) => ({
  type: types.UPDATE_SAVED_LINEJOB_DOCUMENTS,
  payload: data,
});

export const uploadLineJobDrawings = (data) => ({
  type: types.UPDATE_LINEJOB_DRAWINGS,
  payload: data,
});

export const updateSavedLineJobDrawings = (data) => ({
  type: types.UPDATE_SAVED_LINEJOB_DRAWINGS,
  payload: data,
});

export const clearJobDetailsData = () => ({
  type: types.CLEAR_JOB_DETAILS_DATA,
});

export const resetUploadedFilesData = () => ({
  type: types.RESET_UPLOADED_FILES_DATA,
});

export const updateLineJobNotes = (data) => ({
  type: types.UPDATE_LINEJOB_NOTES,
  payload: data,
});

export const clearLineJobNotes = (data) => ({
  type: types.CLEAR_LINEJOB_NOTES,
  payload: data,
});

export const getLineJobNotes = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/notes`,
      method: 'GET',
      types: [types.GET_LINEJOB_NOTES, types.GET_LINEJOB_NOTES_SUCCESS, types.GET_LINEJOB_NOTES_ERROR],
    },
  });

export const createLineJob = (id, body) => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/create`,
      method: 'POST',
      types: [types.CREATE_LINEJOB, types.CREATE_LINEJOB_SUCCESS, types.CREATE_LINEJOB_ERROR],
      body,
    },
  });

export const getLineJobITPs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/LineJobs/${id}/itps`,
      method: 'GET',
      types: [types.GET_LINEJOB_ITPS, types.GET_LINEJOB_ITPS_SUCCESS, types.GET_LINEJOB_ITPS_ERROR],
    },
  });

export const getExternalVDRs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/External/getVdrsByLineJobId/${id}`,
      method: 'GET',
      types: [types.GET_EXTERNAL_VDRS, types.GET_EXTERNAL_VDRS_SUCCESS, types.GET_EXTERNAL_VDRS_ERROR],
    },
  });

export const getExternalITPs = id => dispatch =>
  dispatch({
    [CALL_API]: {
      endpoint: `/api/External/GetItpByLineJobId/${id}`,
      method: 'GET',
      types: [types.GET_EXTERNAL_ITPS, types.GET_EXTERNAL_ITPS_SUCCESS, types.GET_EXTERNAL_ITPS_ERROR],
    },
  });

export const addDocumentsToStaton = (data) => ({
  type: types.ADD_DOCUMENTS_TO_STATION,
  payload: data,
});

export const removeDocumentsToStaton = (data) => ({
  type: types.REMOVE_DOCUMENTS_FROM_STATION,
  payload: data,
});

export const saveModifiedPDF = (data) => ({
  type: types.SAVE_MODIFIED_PDF,
  payload: data,
});

export const updatingPDF = () => ({
  type: types.UPDATING_PDF,
});

