import {alertSignalsData} from "./signals";
import { combineReducers } from 'redux';
import { drawings } from './drawings';
import { issueRevision } from './issueRevision';
import { jobDetails } from './jobDetails';
import { jobStatuses } from './statuses';
import { lineJobTemplates } from './lineJobTemplates';
import { lines } from './lines';
import { monitorData } from './monitorData';
import { operatorStore } from './operatorStore';
import { persistReducer } from 'redux-persist';
import { recentFiles } from './recentFiles';
import storage from 'redux-persist/lib/storage';
import { supervisorJobDetails } from './supervisorJobDetails';
import { authorization } from "./authorization";
import { changeViewStore } from "./roles";

const alertSignalsPersistConfig = {
  key: 'signals',
  storage,
};

export default combineReducers({
  drawings,
  lines,
  jobDetails,
  supervisorJobDetails,
  jobStatuses,
  monitorData,
  lineJobTemplates,
  operatorStore,
  issueRevision,
  recentFiles,
  authorization,
  changeViewStore,
  signals: persistReducer(alertSignalsPersistConfig, alertSignalsData),
});
