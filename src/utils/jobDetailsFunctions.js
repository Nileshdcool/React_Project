import {
  BUTTONS_TEXT,
  REMOVE_STATION_MODAL_HEADER,
  REMOVE_STATION_MODAL_TEXT,
  UNSAVED_MODAL_HEADER,
  UNSAVED_STATIONS_MODAL_TEXT,
} from '../constants';

export const calculateStationTasksTime = (tasks) => {
  const calculateTime = (accumulator, currentValue) => accumulator + currentValue;
  return tasks.map(item => item.estimated).reduce(calculateTime, 0);
};

export const overrideWidgetItemsSortIndex = (unitChecksArray) =>
  unitChecksArray.map((item, i) => ({ ...item, sortIndex: i }));

export const getModalButtons = (actionType) => {
  switch (actionType) {
    case 'cancel':
      return ({
        confirmButtonText: BUTTONS_TEXT.save,
        cancelButtonText: BUTTONS_TEXT.discard,
      });

    case 'delete':
      return ({
        confirmButtonText: BUTTONS_TEXT.remove,
        cancelButtonText: BUTTONS_TEXT.cancel,
      });

    case '':
      return ({
        confirmButtonText: '',
        cancelButtonText: '',
      });

    default:
      return ({
        confirmButtonText: '',
        cancelButtonText: '',
      });
  }
};

export const getModalHeaderText = (actionType) => {
  switch (actionType) {
    case 'cancel':
      return UNSAVED_MODAL_HEADER;
    case 'delete':
      return REMOVE_STATION_MODAL_HEADER;
    default:
      return '';
  }
};
export const getModalBodyText = (actionType) => {
  switch (actionType) {
    case 'cancel':
      return UNSAVED_STATIONS_MODAL_TEXT;
    case 'delete':
      return REMOVE_STATION_MODAL_TEXT;
    default:
      return '';
  }
};

export const revisionMatch = new RegExp("r[0-9]{1,}$");

export const fileNameOrigin = (fileName) => {
  return fileName && fileName.split(".").map((fileNamePart) => fileNamePart.replace(revisionMatch, "")).join(".") || null;
};
