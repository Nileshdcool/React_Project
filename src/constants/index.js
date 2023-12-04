import AppsIcon from '@material-ui/icons/Apps';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import React from 'react';

import IconSvg from '../components/Icon';
import {
  BOMSTabIcon,
  DocumentsTabIcon,
  DrawingsTabIcon,
  ITPTabIcon,
  LogTabIcon,
  SignalTabIcon,
  TasksTabIcon,
  VDRTabIcon,
} from '../components/SvgIcons/svgIcons';

require('dotenv').config();

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const FILTER_PANEL_ICONS = [
  { tiles: <AppsIcon /> },
  { lines: <FormatListBulletedIcon /> },
];
export const NAVIGATION_PANEL_INFO = ['so', 'wo', 'assembly', 'customer', 'description'];

export const BUTTONS_BACKGROUND_COLORS = {
  classic: 'linear-gradient(to bottom, #93c6f4, #064289)',
  classicHovered: 'linear-gradient(to bottom, #0679c5, #064289)',
  classicInverted: 'linear-gradient(to top, #93c6f4, #064289)',
  classicInvertedHovered: 'linear-gradient(to top, #0679c5, #064289)',
  gray: 'linear-gradient(to bottom, #ffffff, #909090)',
  grayHovered: 'linear-gradient(to bottom, #ffffff, #d9d9d9)',
  red: 'linear-gradient(to bottom, #ff6700, #b70f01)',
  redHovered: 'linear-gradient(to bottom, #ff6700, #b70f01)',
  yellow: 'linear-gradient(to top, #c7b109 0%, #ffe400 100%)',
  yellowHovered: 'linear-gradient(to bottom, #0679c5, #064289)',
  now: 'linear-gradient(to top, #cb0101, #f40303)',
  nowHovered: 'linear-gradient(to bottom, #cb0101, #f40303)',
  soon: 'linear-gradient(to bottom, #ff6700, #d75700)',
  soonHovered: 'linear-gradient(to top, #ff6700, #d75700)',
  white: 'none',
  whiteHovered: 'none',
  disabled: 'linear-gradient(to bottom, #e8e8e8, #e8e8e8)',
};

export const TABLE_HEADER_CELLS = [
  {
    title: 'SO#',
    textAlign: 'left',
    styleCell: '70px',
    orderField: 'salesOrder.number',
    cursor: 'pointer',
  },
  {
    title: 'WO#',
    textAlign: 'left',
    styleCell: '70px',
    orderField: 'workOrder.number',
    cursor: 'pointer',
  },
  {
    title: 'DESCRIPTION',
    textAlign: 'left',
    styleCell: '180px',
    orderField: 'description',
    cursor: 'pointer',
  },
  {
    title: 'REVISION#',
    textAlign: 'center',
    styleCell: '70px',
    orderField: 'revisionNumber',
    cursor: 'default',
  },
  {
    title: 'SCHEDULED UNITS',
    textAlign: 'center',
    styleCell: '100px',
    orderField: 'numberOfScheduledUnits',
    cursor: 'pointer',
  },
  {
    title: 'COMPLETED UNITS',
    textAlign: 'center',
    styleCell: '100px',
    orderField: 'numberOfCompletedUnits',
    cursor: 'pointer',
  },
  {
    title: 'PLANNED START DATE',
    textAlign: 'center',
    styleCell: '90px',
    orderField: 'plannedStartDateTime',
    cursor: 'pointer',
  },
  {
    title: 'PLANNED COMPLETION DATE',
    textAlign: 'center',
    styleCell: '130px',
    orderField: 'plannedCompletionDateTime',
    cursor: 'pointer',
  },
];

export const BOM_HEADER_CELLS = [
  {
    title: 'ITEM #',
    textAlign: 'left',
    styleCell: '60px',
  },
  {
    title: 'DRAWING REF.',
    textAlign: 'left',
    styleCell: '110px',
  },
  {
    title: 'TAG NO.',
    textAlign: 'left',
    styleCell: '110px',
  },
  {
    title: 'NO. PCS',
    textAlign: 'center',
    styleCell: '60px',
  },
  {
    title: 'TOT PCS',
    textAlign: 'center',
    styleCell: '60px',
  },
  {
    title: 'PART DESCRIPTION',
    textAlign: 'left',
    styleCell: '150px',
  },
  {
    title: 'PART DIMENSIONS',
    textAlign: 'left',
    styleCell: '150px',
  },
  {
    title: 'MANUFACTURING NOTES',
    textAlign: 'left',
    styleCell: '190px',
  },
  {
    title: 'PER DWG/SPEC',
    textAlign: 'center',
    styleCell: '50px',
  },
  {
    title: 'PART NO.',
    textAlign: 'center',
    styleCell: '90px',
  },
  {
    title: 'MAKE/BUY',
    textAlign: 'center',
    styleCell: '10px',
  },
];

export const LINES = {
  NEW: 'New',
  CREATED: 'Created',
  STAGED: 'Staged',
  ACTIVE: 'Active',
};

export const JOB_STATUS = {
  inProgress: 'IN-PROGRESS',
};

export const WARNING_MODALS_TYPES = {
  tooManyActiveJobs: 'tooManyActiveJobs',
  setupJobStation: 'setupJobStation',
  orderChanging: 'orderChanging',
};

export const USER_SWITCHER_ROLES = [
  { switcherRole: 'Planner' },
  { switcherRole: 'Supervisor' },
  { switcherRole: 'Operator' },
];

export const USER_ROLES = {
  planner: 'Planner',
  supervisor: 'Supervisor',
  operator: 'Operator',
};

export const jobStatuses = [
  { name: '', description: 'Set job status' },
  { name: 'allocated', description: 'Allocated' },
  { name: 'waiting', description: 'Waiting' },
  { name: 'drwrel', description: 'Drawing Released' },
];

export const BUTTONS_TEXT = {
  logout: 'LOGOUT',
  edit: 'EDIT',
  createJob: 'CREATE JOB',
  save: 'SAVE',
  add: 'ADD',
  addAll: 'ADD ALL',
  delete: 'DELETE',
  remove: 'REMOVE',
  activate: 'ACTIVATE',
  cancel: 'CANCEL',
  confirm: 'CONFIRM',
  create: 'CREATE',
  update: 'UPDATE',
  discard: 'DISCARD',
  monitor: 'MONITOR',
  admin: 'ADMIN',
  ok: 'OK',
  addStation: 'ADD STATION',
  createNew: 'CREATE NEW',
  createNewTemplate: 'CREATE TEMPLATE',
  applyTemplate: 'APPLY TEMPLATE',
  deleteTemplate: 'DELETE TEMPLATE',
  viewEdit: 'VIEW/EDIT',
  importITP: 'Import ITP',
  importVDR: 'Import VDR',
  details: 'DETAILS',
  apply: 'APPLY',
  done: 'DONE',
  finish: 'FINISH',
  start: 'START',
  submit: 'SUBMIT',
  issueRevision: 'ISSUE REVISION',
  set: 'SET',
  now: 'NOW',
  soon: 'SOON',
  clearSignal: 'CLEAR SIGNAL',
  continue: 'CONTINUE',
  expand: '+ expand all',
  collapse: '- collapse all',
  backToSupervisorPlanner: 'Back to Planner/Supervisor',
};
export const BUTTONS_TOOLTIPS = {
  createNewTemplate: 'To create a template please save the changes within a station block.',
};

export const widgetsTitles = {
  docs: 'DOCUMENTS',
  drwg: 'DRAWINGS',
  boms: 'BILL OF MATERIALS',
  itps: 'INSPECTION & TEST PLAN',
  vdrs: 'VARIANCE & DISPOSITION REPORT',
  notes: 'NOTES',
};

export const libraryEmptyPlaceholder = {
  docs: 'No documents',
  drwg: 'No drawings',
  boms: 'No BOM',
  checks: 'There are currently no unit checks available to choose. Click CREATE NEW to add a unit check.',
  itps: 'No ITP',
  tasks: 'There are currently no tasks available to choose. Click CREATE NEW to add a task.',
  vdrs: 'No VDR',
};

export const GLOBAL_COLORS = {
  primary: '#07639c',
  secondary: '#ffffff',
  mainCardTitleColor: '#425a70',
  navigationColor: '#006ba6',
  lightGrayColor: '#cccccc',
  errorColor: '#ec4c47',
  closeIconErrorAlert: '#979797',
  monitorGoalsTitleBGColor: '#006ba6',
  warning: '#FFA500',
};

export const LABEL_COLORS = {
  orange: '#ff6700',
  purple: '#7f379b',
  green: '#0a952a',
  red: '#cb0101',
  ...GLOBAL_COLORS,
};
export const LINE_JOB_COLORS = ['#02aef0', '#7d4fbf', '#a4c61a', '#ff008c'];
export const MONITOR_AVERAGES_COLORS = {
  equal: '#0a952a',
  less: '#ff6700',
  exceeded: '#cb0101',
  zero: '#ffffff',
};
export const ICONS_COLORS = {
  ...GLOBAL_COLORS,
};

export const MAIN_PAGES = [
  'monitor',
];

export const JOBS_COLUMN_HEIGHT = 882;

export const DRAWINGS_MODAL_HEADER = 'DRAWING REMOVAL';
export const DRAWINGS_MODAL_TEXT = 'You have chosen to remove a drawing from this job.  If you wish to continue please click REMOVE, otherwise click CANCEL.';

export const REMOVE_ANNOTATION_HEADER = 'ANNOTATION REMOVAL';
export const REMOVE_ANNOTATION_TEXT = 'You have chosen to remove an annotation from this item.  If you wish to continue please click REMOVE, otherwise click CANCEL.';

export const UNSAVED_MODAL_HEADER = 'UNSAVED CHANGES';
export const UNSAVED_MODAL_TEXT = 'There are changes that have been made to the job that have not been saved. If you wish to save the changes please click SAVE, otherwise click DISCARD.';
export const HANDLE_UNSAVED_ANNOTATION_TEXT = 'There are changes that have been made to the annotation that have not been saved.  If you wish to save the changes please click SAVE, otherwise click DISCARD.';

export const UNSAVED_NOTES_MODAL_HEADER = 'UNSAVED CHANGES';
export const UNSAVED_NOTES_MODAL_TEXT = 'There are changes that have been made to the notes that have not been saved.  If you wish to save the changes please click SAVE, otherwise click DISCARD.';

export const DELETE_NOTES_MODAL_HEADER = 'NOTES REMOVAL';
export const DELETE_NOTES_MODAL_TEXT = 'You have chosen to remove notes from this job. If you wish to continue please click REMOVE, otherwise click CANCEL.';

export const CREATE_JOB_MODAL_HEADER = 'CREATE JOB';
export const CREATE_JOB_MODAL_TEXT = 'The job will now be moved to the Created stage. This will release the information to the Supervisor/Leadman. To continue click CREATE.';

export const ISSUE_REVISION_MODAL_HEADER = 'ISSUE REVISION';
// export const ISSUE_REVISION_MODAL_TEXT = 'The job will now be moved to the Created stage. This will release the information to the Supervisor/Leadman. To continue click CREATE.';

export const REMOVE_STATION_MODAL_HEADER = 'Station removal';
export const REMOVE_STATION_MODAL_TEXT = 'You have chosen to remove a station from this job. Please make sure there are no tasks assigned to this station. If you wish to continue please click REMOVE, otherwise click CANCEL.';

export const UNSAVED_STATIONS_MODAL_TEXT = 'There are changes that have been made to the station that have not been saved. If you wish to save the changes please click SAVE, otherwise click DISCARD.';

export const CREATE_TASK_MODAL_HEADER = 'CREATE TASK';
export const UPDATE_TASK_MODAL_HEADER = 'UPDATE TASK';

export const CREATE_UNIT_CHECKS_MODAL_HEADER = 'CREATE UNIT CHECK';
export const UPDATE_UNIT_CHECKS_HEADER = 'UPDATE UNIT CHECK';

export const DELETE_TASK_MODAL_HEADER = 'TASK REMOVAL';
export const DELETE_TASK_MODAL_TEXT = 'You have chosen to remove task from this job. If you wish to continue please click REMOVE, otherwise click CANCEL.';

export const PDF_TYPE = {
  DOC: 'document',
  DRW: 'drawing',
  ODW: 'operatorDrawing',
};

export const PDF_DISABLED_TOOLS = [
  'searchButton',
  'signatureToolButton',
  'miscToolGroupButton',
  'cloudToolButton',
  'textToolGroupButton',
  'eraserToolButton',
  'thumbnailsPanelButton',
  'outlinesPanelButton',
  'menuButton',
  'searchPanel',
  'linkButton',
  'toolStylePopup',
  'stickyToolButton',
  'richTextUnderlineButton',
  'richTextItalicButton',
  'richTextColorPalette',
  'annotationStyleEditButton',
];

export const PDF_DOCUMENTS_DISABLED_TOOLS = [
  'freeHandToolGroupButton',
  'shapeToolGroupButton',
  'freeTextToolButton',
  'toolsButton',
  'leftPanelButton',
  'leftPanel',
  'annotationCommentButton',
  'annotationDeleteButton',
];

export const PDF_DRAWINGS_DISABLED_TOOLS = [
  'viewControlsButton',
];

export const STYLED_ANNOTATIONS = [
  'AnnotationCreateRectangle',
  'AnnotationCreateEllipse',
  'AnnotationCreateLine',
  'AnnotationCreateArrow',
  'AnnotationCreatePolyline',
  'AnnotationCreatePolygon',
];

export const DELETE_UNIT_CHECK_MODAL_HEADER = 'UNIT CHECK REMOVAL';
export const DELETE_UNIT_CHECK_MODAL_TEXT = 'You have chosen to remove a unit check from this job. If you wish to continue please click REMOVE, otherwise click CANCEL.';

export const NO_ITPS_MODAL_HEADER = 'No ITP found';
export const NO_ITPS_MODAL_TEXT = 'No ITP was associated with the current job\'s sale order number.';

export const APPLY_TEMPLATE_MODAL_HEADER = 'APPLYING TEMPLATE';
export const APPLY_TEMPLATE_MODAL_TEXT = 'You have chosen to apply a template to this job. Please note, that it will replace all existing tasks, unit checks, station blocks and stations assignment.  If you wish to continue please click APPLY otherwise click CANCEL.';

export const DELETE_TEMPLATE_MODAL_HEADER = 'DELETE TEMPLATE';
export const DELETE_TEMPLATE_MODAL_TEXT = 'You have chosen to delete a template. If you wish to continue please click DELETE otherwise click CANCEL.';

export const ACTIVATE_JOB_MODAL_HEADER = 'ACTIVATE JOB';
export const ACTIVATE_JOB_MODAL_TEXT = 'Before activating a job please ensure that "BOM", "Drawing", "Tasks", and "Unit Checks" are added to all stations. ';

export const WARNING_MODAL_HEADER = 'WARNING';

export const WARNING_MODALS_TEXT_MAP = {
  tooManyActiveJobs: 'There cannot be more than 4 Active Jobs at a time.',
  setupJobStation: 'To move the job to the STAGED /ACTIVE phase, please ensure that at least one station is setup.',
  orderChanging: 'Changing the order of the active jobs will affect Operator Stations. To proceed click OK.',
};

export const MULTI_SELECT_GROUP_TYPES = {
  DOC: 'DOCUMENTS',
  DRW: 'DRAWINGS',
};
export const TASKS_TYPES = {
  operation: 'Operation',
  inspection: 'Inspection',
};

export const OPERATOR_MATERIALS_NAVIGATION_TABS = [
  { id: 'drawings', name: 'DRAWINGS', icon: <DrawingsTabIcon /> },
  { id: 'boms', name: 'BILL OF MATERIALS', icon: <BOMSTabIcon /> },
  { id: 'documents', name: 'DOCUMENTS', icon: <DocumentsTabIcon /> },
  { id: 'itps', name: 'INSPECTION & TEST PLAN', icon: <ITPTabIcon /> },
  {
    id: 'vdrs',
    name: 'VARIANCE & DISPOSITION REPORT',
    icon: <VDRTabIcon />,
    isOpenInModal: true,
  },
  {
    id: 'notes',
    name: 'NOTES',
    icon: <IconSvg
      color="secondary"
      icon={<AssignmentIcon />}
      iconFontSize="27px"
    />,
    isOpenInModal: true,
  },
];
export const OPERATOR_MATERIALS_ITEMS = {
  firstLine: [
    { id: 'drawings', name: 'DRAWINGS', icon: <DrawingsTabIcon /> },
    { id: 'boms', name: 'BILL OF MATERIALS', icon: <BOMSTabIcon /> },
    { id: 'documents', name: 'DOCUMENTS', icon: <DocumentsTabIcon /> }
  ],
  secondLine: [
    { id: 'itps', name: 'INSPECTION & TEST PLAN', icon: <ITPTabIcon /> },
    {
      id: 'vdrs',
      name: 'VARIANCE & DISPOSITION REPORT',
      icon: <VDRTabIcon />,
      isOpenInModal: true,
    },
    {
      id: 'notes',
      name: 'NOTES',
      icon: <IconSvg
        color="secondary"
        icon={<AssignmentIcon />}
        iconFontSize="27px"
      />,
      isOpenInModal: true,
    },
  ]
}

export const OPERATOR_SIDEBAR_TABS = [
  { id: 'tasks', name: 'TASKS', icon: <TasksTabIcon /> },
  { id: 'signal', name: 'SIGNAL', icon: <SignalTabIcon /> },
  { id: 'log', name: 'LOG', icon: <LogTabIcon /> },
];

export const DRAWER_TABS = {
  tasks: 'tasks',
  signal: 'signal',
  log: 'log',
};

export const UNIT_CHECK_ACTIONS = {
  done: 'DONE',
};

export const SWITCHER_LABEL = 'DRAWING ANNOTATIONS';

export const switcherToggleText = bool => (bool ? 'ON' : 'OFF');

export const CREATE_NEW_TEMPLATE_MODAL_HEADER = 'CREATE TEMPLATE';
// line 2, staged, Work Order 8349284, station E-59 for dev
export const OPERATOR_STATION_ID_DEV = process.env.REACT_APP_DATA_BASE_KEY === 'DEV'
  ? '54f22af9-5aca-4958-9ebc-e7137393a603'
  : 'a5ea42b7-98ab-4244-9f41-fcafac62f592';
export const MAX_ACTIVE_LINE_JOBS_COUNT = 4;

export const OPERATOR_BOM_MODAL_SIZE = {
  x: 0, y: 0, width: 1600, height: 600,
};

export const NO_ACTIVE_JOBS = 'No active jobs for this station';
export const NO_DRAWINGS = 'No drawings are assigned to the active job for this station';

export const DRAWER_WIDTH_VALUE = {
  expandedDrawer: '395px',
  minimizedDrawer: '90px',
};

export const OPERATOR_SIGNAL_BLOCKS_HEADER_COLOR = {
  NOW: '#cb0101',
  SOON: '#ff6700',
};

export const FIRST_ARTICLE = 'First Article';

export const EMPLOYEE_NUMBER_TITLE = 'ENTER EMPLOYEE NUMBER';

export const EMPLOYEE_NUMBER_ERROR = 'Enter a valid employee number';

export const STATION_NOTIFICATIONS_TYPE = {
  LineJobStation: 'LineJobStation',
  notes: 'LineJobStation',
  libraryNotes: 'LineJobNote',
  drawings: 'StationDrawing',
  documents: 'StationDocument',
  boms: 'StationBillOfMaterialsItem',
  itps: 'StationInspectionTestPlan',
  vdrs: 'StationVarianceDispositionReport',
  tasks: 'StationTask',
  inspectionTasks: 'StationInspectionTask',
  operationTasks: 'StationOperationTask',
  unitChecks: 'StationUnitCheck',
};

export const LINEJOB_NOTIFICATIONS_TYPE = {
  LineJob: 'LineJob',
  Drawing: 'LineJobDrawing',
  Document: 'LineJobDocument',
  BOMItem: 'LineJobBillOfMaterialsItem',
  Note: 'LineJobNote',
  ITPItem: 'LineJobInspectionTestPlan',
};

export const DELETED_STATION_NOTIFICATION_MESSAGE = {
  deleted: { message: 'Supervisor has unassigned current station from the job' },
  stageChanged: { message: 'Supervisor has removed the job from active status' },
  queueChanged: { message: 'Supervisor has changed the order of active jobs' },
};

export const TOKENS_BY_USER_ROLE = {
  Planner: 'Bearer eyJyb2xlIjoicGxhbm5lciJ9',
  Supervisor: 'Bearer eyJyb2xlIjoic3VwZXJ2aXNvciJ9',
  Leadman: 'Bearer eyJyb2xlIjoic3VwZXJ2aXNvciJ9',
};

export const NON_AUTH_ROLE_REDIRECT_URL = {
  planner: '/',
  supervisor: '/',
  leadman: '/',
  operator: '/operator',
  none: '/',
};
