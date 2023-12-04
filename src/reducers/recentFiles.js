import {
  CHECK_DRAWING_VERSION,
  OPEN_RECENT_FILES_LOADER,
  CHECK_SAME_FILE,
  CLEAR_RECENT_FILES_DATA,
  GET_FILE_DATA,
  GET_FILE_DATA_ERROR,
  GET_FILE_DATA_SUCCESS,
  GET_RECENT_FILES,
  GET_RECENT_FILES_ERROR,
  GET_RECENT_FILES_SUCCESS,
  SAVE_RECENT_FILES_DOCUMENTS,
  SAVE_RECENT_FILES_DRAWINGS,
  IS_NEED_TO_ADD_ANNOTATION,
  SET_IS_PREV_FILE_HAS_ANNOTATION
} from '../constants/actionCreators';

const INITIAL_STATE = {
  error: '',
  recentFilesFolderPath: null,
  isSameFileDocuments: false,
  isSameFileDrawings: false,
  isNewVersion: false,
  loading: false,
  recentFilesList: [],
  recentDrawings: [],
  recentDocuments: [],
  recentFile: null,
  isRecentFilesLoaderOpen: false,
  isNeedToAddAnnotation: false,
  isPrevFileHasAnnotation: false,
};

export const recentFiles = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_RECENT_FILES:
      return { ...state, recentFilesFolderPath: null,loading: true };
    case GET_RECENT_FILES_SUCCESS:
      return {
        ...state,
        recentFilesList: action.payload.files,
        recentFilesFolderPath: action.payload.folderPath,
        loading: false,
        success: true,
        error: '',
      };
    case GET_RECENT_FILES_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case GET_FILE_DATA:
      return { ...state, loading: true };
    case GET_FILE_DATA_SUCCESS:
      return {
        ...state,
        recentFile: action.payload.fileData,
        loading: false,
        success: true,
        error: '',
      };
    case GET_FILE_DATA_ERROR:
      return {
        ...state,
        error: action.description,
        loading: false,
        success: false,
      };
    case SAVE_RECENT_FILES_DOCUMENTS:
      return {
        ...state,
        recentDocuments: action.payload
      };
    case SAVE_RECENT_FILES_DRAWINGS:
      return {
        ...state,
        recentDrawings: action.payload
      };
    case CHECK_SAME_FILE:
      return {
        ...state,
        isSameFileDocuments: action.destination === 'documents' ? action.payload : state.isSameFileDocuments,
        isSameFileDrawings: action.destination === 'drawings' ? action.payload : state.isSameFileDrawings
      };
    case CHECK_DRAWING_VERSION:
      return {
        ...state,
        isNewVersion: action.payload
      };
    case OPEN_RECENT_FILES_LOADER:
      return {
        ...state,
        isRecentFilesLoaderOpen: action.payload
      };
    case IS_NEED_TO_ADD_ANNOTATION:
      return {
        ...state,
        isNeedToAddAnnotation: action.payload
      };
    case SET_IS_PREV_FILE_HAS_ANNOTATION:
      return {
        ...state,
        isPrevFileHasAnnotation: action.payload
      };
    case CLEAR_RECENT_FILES_DATA:
      return {
        ...state,
        recentDrawings: [],
        recentDocuments: [],
        recentFile: null
      };
    default:
      return state;
  }
};
