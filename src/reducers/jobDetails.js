import {
  ADD_DOCUMENTS_TO_STATION,
  ADD_DRAWINGS_TO_STATION,
  CLEAR_JOB_DETAILS_DATA,
  CLEAR_LINEJOB_NOTES,
  GET_EXTERNAL_ITPS,
  GET_EXTERNAL_ITPS_ERROR,
  GET_EXTERNAL_ITPS_SUCCESS,
  GET_EXTERNAL_VDRS,
  GET_EXTERNAL_VDRS_ERROR,
  GET_EXTERNAL_VDRS_SUCCESS,
  GET_LINEJOB_BOMS,
  GET_LINEJOB_BOMS_ERROR,
  GET_LINEJOB_BOMS_SUCCESS,
  GET_LINEJOB_DOCUMENTS,
  GET_LINEJOB_DOCUMENTS_ERROR,
  GET_LINEJOB_DOCUMENTS_SUCCESS,
  GET_LINEJOB_DRAWINGS,
  GET_LINEJOB_DRAWINGS_ERROR,
  GET_LINEJOB_DRAWINGS_SUCCESS,
  GET_LINEJOB_ITPS,
  GET_LINEJOB_ITPS_ERROR,
  GET_LINEJOB_ITPS_SUCCESS,
  GET_LINEJOB_NOTES,
  GET_LINEJOB_NOTES_ERROR,
  GET_LINEJOB_NOTES_SUCCESS,
  GET_LINEJOB_STATUSES,
  GET_LINEJOB_STATUSES_ERROR,
  GET_LINEJOB_STATUSES_SUCCESS,
  HANDLE_UNSAVED_CHANGES,
  HANDLE_UNSAVED_CHANGES_IN_ANNOTATIONS,
  HANDLE_UNSAVED_CHANGES_IN_BOM,
  HANDLE_UNSAVED_CHANGES_IN_DOCUMENTS,
  HANDLE_UNSAVED_CHANGES_IN_DRAWINGS,
  HANDLE_UNSAVED_CHANGES_IN_ITPS,
  HANDLE_UNSAVED_CHANGES_IN_NOTES,
  LIVE_UPDATE_BOMS,
  REMOVE_DOCUMENTS_FROM_STATION,
  REMOVE_DRAWINGS_FROM_STATION,
  RESET_UPLOADED_FILES_DATA,
  SAVE_MODIFIED_PDF,
  UPDATE_BOMS,
  UPDATE_LINEJOB_DETAILS,
  UPDATE_LINEJOB_DETAILS_ERROR,
  UPDATE_LINEJOB_DETAILS_SUCCESS,
  UPDATE_LINEJOB_DRAWINGS,
  UPDATE_LINEJOB_NOTES,
  UPDATE_LINEJOB_STATUS,
  UPDATE_LINEJOB_STATUS_ERROR,
  UPDATE_LINEJOB_STATUS_SUCCESS,
  UPDATE_MODIFIED_DRAWINGS_FILES,
  UPDATE_SAVED_LINEJOB_DOCUMENTS,
  UPDATE_SAVED_LINEJOB_DRAWINGS,
  UPDATING_PDF,
  UPLOAD_NEW_LINEJOB_DOCUMENTS,
} from '../constants/actionCreators';

import uniqBy from 'lodash/uniqBy';

const INITIAL_STATE = {
  annotatedFileName: '',
  boms: [],
  checkedBoms: [],
  documents: [],
  drawings: [],
  dropdownDrawings: [],
  dropdownDocuments: [],
  error: '',
  jobNotes: '',
  jobStatuses: [],
  modifiedFiles: [],
  loading: false,
  liveUpdatedBoms: [],
  initData: {
    documents: [],
    drawings: [],
  },
  planerITPs: [],
  planerExternalVDRs: [],
  savedChanges: true,
  savedChangesInDocuments: true,
  savedChangesInDrawings: true,
  savedChangesInBOM: true,
  savedChangesInNotes: true,
  savedChangesInAnnotations: true,
  savedChangesInITPs: true,
  stationDrawings: [],
  stationDocuments: [],
  widgetDrawings: [],
  unsavedNotes: '',
  uploadedDocuments: [],
  uploadedDrawings: [],
};
export const jobDetails = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UPLOAD_NEW_LINEJOB_DOCUMENTS:
      return {
        ...state,
        uploadedDocuments: action.payload,
      };
    case UPDATE_SAVED_LINEJOB_DOCUMENTS:
      return {
        ...state,
        documents: action.payload,
      };
    case UPDATE_LINEJOB_DRAWINGS:
      return {
        ...state,
        uploadedDrawings: action.payload,
      };
    case UPDATE_LINEJOB_NOTES:
      return {
        ...state,
        unsavedNotes: action.payload,
      };
    case CLEAR_LINEJOB_NOTES:
      return {
        ...state,
        unsavedNotes: '',
        jobNotes: '',
      };
    case UPDATE_SAVED_LINEJOB_DRAWINGS:
      return {
        ...state,
        drawings: action.payload,
      };

    case GET_LINEJOB_BOMS:
      return { ...state, loading: true };
    case GET_LINEJOB_BOMS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_BOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
        boms: action.payload,
        checkedBoms: action.payload,
      };
    case GET_LINEJOB_ITPS:
      return { ...state, loading: true };
    case GET_LINEJOB_ITPS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
        planerITPs: action.payload,
      };
    case GET_LINEJOB_ITPS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_EXTERNAL_ITPS:
      return { ...state, loading: true };
    case GET_EXTERNAL_ITPS_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const filteredITPsArray = uniqBy([...state.planerITPs, ...action.payload], 'itpNumber');
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
        planerITPs: filteredITPsArray,
        savedChangesInITPs: filteredITPsArray.length === state.planerITPs.length,
      };
    case GET_EXTERNAL_ITPS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_EXTERNAL_VDRS:
      return { ...state, loading: true };
    case GET_EXTERNAL_VDRS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
        planerExternalVDRs: action.payload,
      };
    case GET_EXTERNAL_VDRS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_STATUSES:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LINEJOB_STATUSES_SUCCESS:
      return {
        ...state,
        jobStatuses: action.payload,
        loading: false,
        success: true,
        error: '',
      };
    case GET_LINEJOB_STATUSES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_NOTES:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case GET_LINEJOB_NOTES_SUCCESS:
      return {
        ...state,
        jobNotes: !!action.payload ? action.payload : {},
        loading: false,
        success: true,
        error: '',
        unsavedNotes: action?.payload?.text || ''
      };
    case GET_LINEJOB_NOTES_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_DOCUMENTS:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
        initData: { ...state.initData, documents: []}
      };
    case GET_LINEJOB_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documents: [...action.payload],
        stationDocuments: action.payload.map((doc, i) => ({
          ...doc,
          value: i + 1,
          isChecked: false,
        })),
        dropdownDocuments: action.payload.map((doc, i) => ({
          ...doc,
          value: i + 1,
          isChecked: false,
        })),
        loading: false,
        success: true,
        error: '',
        savedChanges: true,
        initData: { ...state.initData, documents: [...action.payload]}
      };
    case GET_LINEJOB_DOCUMENTS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case GET_LINEJOB_DRAWINGS:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
        initData: { ...state.initData, drawings: []}
      };
    case GET_LINEJOB_DRAWINGS_SUCCESS:
      return {
        ...state,
        drawings: [...action.payload],
        stationDrawings: action.payload.map((doc, i) => ({
          ...doc,
          value: i + 1,
          isChecked: false,
        })),
        dropdownDrawings: action.payload.map((doc, i) => ({
          ...doc,
          value: i + 1,
          isChecked: false,
        })),
        loading: false,
        success: true,
        error: '',
        savedChanges: true,
        initData: { ...state.initData, drawings: [...action.payload]}
      };
    case GET_LINEJOB_DRAWINGS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case UPDATE_LINEJOB_STATUS:
      return { ...state, loading: true };
    case UPDATE_LINEJOB_STATUS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case UPDATE_LINEJOB_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case UPDATE_LINEJOB_DETAILS:
      return { ...state, loading: true };
    case UPDATE_LINEJOB_DETAILS_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case UPDATE_LINEJOB_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case HANDLE_UNSAVED_CHANGES:
      return {
        ...state,
        savedChanges: action.payload,
      };
    case HANDLE_UNSAVED_CHANGES_IN_DOCUMENTS:
      return {
        ...state,
        savedChangesInDocuments: action.payload,
      };
    case HANDLE_UNSAVED_CHANGES_IN_DRAWINGS:
      return {
        ...state,
        savedChangesInDrawings: action.payload,
      };
    case HANDLE_UNSAVED_CHANGES_IN_BOM:
      return {
        ...state,
        savedChangesInBOM: action.payload,
      };
    case HANDLE_UNSAVED_CHANGES_IN_NOTES:
      return {
        ...state,
        savedChangesInNotes: action.payload,
      };
    case HANDLE_UNSAVED_CHANGES_IN_ANNOTATIONS:
      return {
        ...state,
        savedChangesInAnnotations: action.payload,
      };
    case HANDLE_UNSAVED_CHANGES_IN_ITPS:
      return {
        ...state,
        savedChangesInITPs: action.payload,
      };
    case UPDATE_BOMS:
      return {
        ...state,
        checkedBoms: action.payload,
      };
    case ADD_DOCUMENTS_TO_STATION:
      return {
        ...state,
        stationDocuments: action.payload.stationDocuments,
        dropdownDocuments: action.payload.id
          ? action.payload.stationDocuments
            .map(doc => (doc.id === action.payload.id ? { ...doc, isChecked: true } : doc))
          : state.dropdownDocuments,
      };
    case REMOVE_DOCUMENTS_FROM_STATION:
      return {
        ...state,
        stationDocuments: action.payload.stationDocuments,
        dropdownDocuments: action.payload.id
          ? action.payload.stationDocuments
            .map(doc => (doc.id === action.payload.id ? { ...doc, isChecked: false } : doc))
          : state.dropdownDocuments,
      };
    case ADD_DRAWINGS_TO_STATION:
      return {
        ...state,
        stationDrawings: action.payload.stationDrawings,
        dropdownDrawings: action.payload.id
          ? action.payload.stationDrawings
            .map(doc => (doc.id === action.payload.id ? { ...doc, isChecked: true } : doc))
          : state.dropdownDrawings,
      };
    case REMOVE_DRAWINGS_FROM_STATION:
      return {
        ...state,
        stationDrawings: action.payload.stationDrawings,
        dropdownDrawings: action.payload.id
          ? action.payload.stationDrawings
            .map(doc => (doc.id === action.payload.id ? { ...doc, isChecked: false } : doc))
          : state.dropdownDrawings,
      };
    case LIVE_UPDATE_BOMS:
      return {
        ...state,
        liveUpdatedBoms: action.payload,
      };
    case SAVE_MODIFIED_PDF:
      return {
        ...state,
        modifiedFiles: uniqBy([
          ...state.modifiedFiles.filter(item => item.name !== action.payload.name),
          action.payload,
        ], 'name'),
        annotatedFileName: action.payload.name,
        widgetDrawings: [
          ...state.drawings.filter(drawing => (drawing.fileName || drawing.name) !== action.payload.name),
          ...state.uploadedDrawings.filter(drawing => (drawing.fileName || drawing.name) !== action.payload.name),
          action.payload,
        ],
        pdfAnnotations: action.payload.pdfAnnotations,
        loading: false
      };
    case UPDATING_PDF:
      return {
        ...state,
        loading: true
      };
    case UPDATE_MODIFIED_DRAWINGS_FILES:
      return {
        ...state,
        modifiedFiles: action.payload,
      };
    case CLEAR_JOB_DETAILS_DATA:
      return {
        ...state,
        annotatedFileName: '',
        jobStatuses: [],
        stationDocuments: [],
        dropdownDocuments: state.dropdownDocuments
          .map(doc => ({ ...doc, isChecked: false })),
        stationDrawings: [],
        dropdownDrawings: state.dropdownDrawings
          .map(doc => ({ ...doc, isChecked: false })),
        drawings: [],
        documents: [],
        uploadedDocuments: [],
        uploadedDrawings: [],
        jobNotes: '',
        unsavedNotes: '',
        checkedBoms: [],
        liveUpdatedBoms: [],
        planerITPs: [],
        planerExternalVDRs: [],
        modifiedFiles: [],
      };
    case RESET_UPLOADED_FILES_DATA:
      return {
        ...state,
        annotatedFileName: '',
        stationDrawings: [],
        dropdownDrawings: state.dropdownDrawings
          .map(doc => ({ ...doc, isChecked: false })),
        stationDocuments: [],
        dropdownDocuments: state.dropdownDocuments
          .map(doc => ({ ...doc, isChecked: false })),
        uploadedDocuments: [],
        uploadedDrawings: [],
        jobNotes: '',
        unsavedNotes: '',
        modifiedFiles: [],
      };
    default:
      return state;
  }
};
