import Fade from '@material-ui/core/Fade';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, compose } from 'redux';

import {
  clearStationDrawings,
  getLineJobStationDrawings,
  removeDrawingsToStaton,
  saveSupervisorDrawings,
  updateLineJobStationDrawings,
  updateModifiedDrawingsFiles,
} from '../../../../actions/drawings';
import {
  getLineJobRevisedElementTypes,
  getLineJobRevisionNotifications,
  viewNotificationsModalAsSupervisor,
} from '../../../../actions/issueRevision';
import {
  addDocumentsToStaton,
  clearJobDetailsData,
  getChoosedLineJobBOMs,
  getLineJobDetails,
  getLineJobDrawings,
  getLineJobNotes,
  handleUnsavedChangesInDrawings,
  handleUnsavedChangesInNotes,
  removeDocumentsToStaton,
  updateChoseLineJobBOMs,
  updateLineJobNotes,
} from '../../../../actions/jobDetails';
import { getTemplates } from '../../../../actions/jobDetailsTemplates';
import { getLineJobsSupervisor } from '../../../../actions/lines';
import {
  clearITPs,
  getLineJobStationITPs,
  getLineJobStationITPsWithoutSettingToRedux,
  getSupervisorLineJobITPs,
  setIsStationHasITPs,
} from '../../../../actions/supervisorITPs';
import {
  addBOMsToStation,
  addTasksToStation,
  clearAddedStationBOMs,
  clearAddedStationTasks,
  clearLineJobStationsData,
  clearLineJobStationsWidgetsData,
  clearStationBOMS,
  deleteLineJobStation,
  getDrawingsLineJobID,
  getLineJobID,
  getLineJobStationBOMs,
  getLineJobStationDocuments,
  getLineJobStations,
  getLineJobStationsWithDetails,
  getLineJobStationTasks,
  getLineJobTasks,
  getLineStations,
  removeTasksFromStaton,
  saveLineJobStation,
  saveNotes,
  setBOMsToStation,
  setInitialStationBoms,
  setLineJobStationTasks,
  updateLineJobStationDocuments,
  updateLineJobStationTasks,
  updateLineTasks,
  updateStationTasks,
  getLineJobStationDetails,
  setLineJobStationDetails,
} from '../../../../actions/supervisorJobDetails';
import {
  clearVDRs,
  getLineJobStationVDRs,
  getLineJobStationVDRsWithoutSettingToRedux,
  getLinejobVDRs,
  setIsStationHasVDRs,
} from '../../../../actions/supervisorVDRs';
import {
  clearUnitChecks,
  getLineJobStationUnitChecks,
  getLineJobStationUnitChecksWithoutSettingToRedux,
  getLineUnitChecks,
  setIsStationHasUnitChecks,
} from '../../../../actions/unitChecks';
import Loader from '../../../../components/Loader/Loader';
import ModalDialog from '../../../../components/ModalDialog';
import IssueRevisionInfo from '../../../../components/ModalDialog/IssueRevision/IssueRevisionInfo';
import { FIRST_ARTICLE } from '../../../../constants';
import { groupingArrayOfObjectsByKey } from '../../../../utils/arrayFilters';
import {
  getModalBodyText,
  getModalButtons,
  getModalHeaderText,
} from '../../../../utils/jobDetailsFunctions';
import { sortByStationIndex } from '../../../../utils/sorting';
import JobDetailsActionsBlock from './components/JobDetailsActionsBlock/JobDetailsActionsBlock';
import NavigationPanel from './components/NavigationPanel';
import StationMainData from './components/StationMainData/StationMainData';
import StationWidget from './components/StationWidget/StationWidget';
import Tabs from './components/Tabs/Tabs';
import {
  JobDetailsContent,
  JobDetailsWrapper,
  MainContentWrapper,
  SideBarWrapper,
} from './styledComponents';

let testCount = 1;

const checkStationTasks = (station, stationTasks) => {
  const filteredTasks = stationTasks.filter(
    (task) => task.stationId === station.id,
  );
  return filteredTasks;
};

const updateStationSelect = (lineStations, station, sortedStations) => {
  const foundInitialStation = lineStations.find(
    (item) => item.id === station.id,
  );
  return [foundInitialStation, ...sortedStations];
};

const initialState = {
  isModalOpen: false,
  isLoaderDisable: true,
  isAddNewStation: false,
  isBack: false,
  stations: [],
  openedStation: '',
  isStationDataSavedChanges: true,
  nameButton: '',
  stationActionType: '',
  isNotCloseOpenedBlock: false,
  nextOpenStation: '',
  selectedStationBySelect: {},
  isUnsavedNotesDialogOpen: false,
  openedStationId: '',
  isDataLoading: false,
};

class JobDetailsSupervisor extends Component {
  constructor() {
    super();
    this.isBackButtonClicked = false;
    this.myDivToFocus = React.createRef();
  }

  state = {
    ...initialState,
  };

  openStationData = (stationName) => {
    const {
      openedStation,
      isStationDataSavedChanges,
      isDataLoading,
    } = this.state;
    const {
      getLineJobStationDocuments,
      getLineJobStationDrawings,
      lineJobStations,
      addBOMsToStation,
      setStationsBoms,
      supervisorLineBOMs,
      updateChoseLineJobBOMs,
      setInitialStationBoms,
      getLineJobStationUnitChecks,
      getLineJobStationVDRs,
      getLineJobStationITPs,
      savedChangesInDrawings,
      handleUnsavedChangesInDrawings,
    } = this.props;
    const openedStationId = get(
      lineJobStations.find((station) => station.name === stationName),
      'id',
    );
    this.setState({ openedStationId, isDataLoading: true });
    if (isStationDataSavedChanges && savedChangesInDrawings) {
      Promise.all([
        getLineJobStationDocuments(openedStationId),
        getLineJobStationDrawings(openedStationId),
        getLineJobStationUnitChecks(openedStationId),
        getLineJobStationVDRs(openedStationId),
        getLineJobStationITPs(openedStationId),
      ]).then(() => {
        const openedStationBOMs = setStationsBoms.filter(
          (item) => item.lineJobStationId === openedStationId,
        );
        const openedStationBOMsIds = openedStationBOMs.map(
          (item) => item.bom.id,
        );
        const updatedBOMs = supervisorLineBOMs.map((item) =>
          openedStationBOMsIds.includes(item.id)
            ? { ...item, isCheckedForStation: true }
            : item,
        );
        Promise.all([
          setInitialStationBoms(openedStationBOMs),
          updateChoseLineJobBOMs(updatedBOMs),
          addBOMsToStation(openedStationBOMs),
        ]).then(() => this.setState({ isDataLoading: false }));
      });
    }
    const prevOpenedStation = openedStation;
    if (
      openedStation !== stationName &&
      (!isStationDataSavedChanges || !savedChangesInDrawings)
    ) {
      this.setState({
        isModalOpen: true,
        stationActionType: 'cancel',
        isStationDataSavedChanges: true,
        isNotCloseOpenedBlock: true,
        isAddNewStation: false,
        nextOpenStation: stationName,
        savedStationName: prevOpenedStation,
      });
      handleUnsavedChangesInDrawings(true);
    } else {
      this.setState({
        openedStation: stationName,
        isAddNewStation: false,
        selectedStationBySelect: {},
        savedStationName: stationName,
      });
    }
  };

  getPageData = async () => {
    const {
      match,
      location,
      getLineStations,
      getLineJobStations,
      getLineJobStationsWithDetails,
      getLineJobDetails,
      selectedLine,
      getLineJobNotes,
      getLineJobStationDetails,
      getLineJobStationDocuments,
      getLineJobStationDrawings,
      getLineJobID,
      getDrawingsLineJobID,
      getLineJobTasks,
      getLineJobStationTasks,
      setLineJobStationTasks,
      getLineJobStationBOMs,
      setBOMsToStation,
      getLineUnitChecks,
      getLineJobStationUnitChecksWithoutSettingToRedux,
      setIsStationHasUnitChecks,
      getLinejobVDRs,
      getSupervisorLineJobITPs,
      getLineJobStationVDRsWithoutSettingToRedux,
      getLineJobStationITPsWithoutSettingToRedux,
      setIsStationHasVDRs,
      setIsStationHasITPs,
      clearUnitChecks,
      clearVDRs,
      clearITPs,
      getTemplates,
      getLineJobRevisionNotifications,
      getLineJobRevisedElementTypes,
      setLineJobStationDetails,
    } = this.props;

    this.setState({ isDataLoading: true });
    Promise.all([
      getTemplates(selectedLine),
      getLineStations(selectedLine),
      getLineJobStationsWithDetails(match.params.jobId),
      // getLineJobStations(match.params.jobId)
      // .then(
      //   (response) =>
      //     response && 
      //     response.data.forEach((station) => {
      //       getLineJobStationDetails(station.id).then((response) => {
      //         if (response) {
      //           setLineJobStationDetails(response.data, station.id)
      //         }
      //         // if (response) {
      //         //   getLineJobID(response.data.documents, station.id);
      //         //   getDrawingsLineJobID(response.data.drawings, station.id);
      //         //   setIsStationHasUnitChecks(response.data.unitChecks.length > 1, station.id);
      //         //   setIsStationHasVDRs(response.data.vdrs.length > 0, station.id);
      //         //   setIsStationHasITPs(response.data.itps.length > 0, station.id);
      //         //   setLineJobStationTasks(response.data.tasks, station.id);
      //         //   setBOMsToStation(response.data.boms);
      //         // }
      //       });
          // })})),
      // ),
      getLineJobDetails(match.params.jobId),
      getLineJobNotes(match.params.jobId),
      getLineJobTasks(match.params.jobId),
      getLineUnitChecks(match.params.jobId),
      getLinejobVDRs(match.params.jobId),
      getSupervisorLineJobITPs(match.params.jobId),
      clearUnitChecks(),
      clearVDRs(),
      clearITPs(),
      getLineJobRevisedElementTypes(),
      getLineJobRevisionNotifications(match.params.jobId),
    ]).then(() => {
      this.setState({ isDataLoading: false });
      if (location.state) {
        this.openStationData(location.state.stationName);
        this.setState({
          openedStation: location.state.stationName,
        });
      }
    });
  };

  async componentDidMount() {
    console.error('mrut', testCount++)
    this.getPageData();
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', this.onBackButtonEvent);
  }

  componentDidUpdate(prevProps) {
    const { lineJobStationTasks, updateLineTasks, lineTasks } = this.props;
    const { isStationDataSavedChanges } = this.state;
    const { savedChangesInNotes, savedChangesInDrawings } = this.props;
    const isAllChangesSaved =
      isStationDataSavedChanges &&
      savedChangesInNotes &&
      savedChangesInDrawings;
    if (!isAllChangesSaved) {
      window.onbeforeunload = (evt) => {
        const message = '';
        if (evt) {
          evt.returnValue = message;
        }
        return message;
      };
    } else {
      window.onbeforeunload = null;
    }
    if (prevProps.lineJobStationTasks.length !== lineJobStationTasks.length) {
      const checkedTasks =
        lineJobStationTasks.length > 0 &&
        lineJobStationTasks
          .filter((item) => item.isChecked && item.id)
          .map((task) => task.id);
      if (checkedTasks) {
        const updatedTasks = lineTasks.map((item) =>
          checkedTasks.includes(item.id) ? { ...item, isChecked: true } : item,
        );
        updateLineTasks(updatedTasks);
      }
    }
  }

  componentWillUnmount() {
    const {
      getLineJobsSupervisor,
      selectedLine,
      clearLineJobStationsData,
      clearStationBOMS,
      clearUnitChecks,
      clearVDRs,
      clearITPs,
    } = this.props;
    getLineJobsSupervisor(selectedLine);
    window.removeEventListener('popstate', this.onBackButtonEvent);
    clearLineJobStationsData();
    clearStationBOMS();
    clearUnitChecks();
    clearVDRs();
    clearITPs();
    this.setState(initialState);
  }

  onBackButtonEvent = (e) => {
    const { isStationDataSavedChanges } = this.state;
    const { savedChangesInNotes, savedChangesInDrawings } = this.props;
    e.preventDefault();
    if (!this.isBackButtonClicked) {
      if (!isStationDataSavedChanges || !savedChangesInDrawings) {
        this.setState({
          isModalOpen: true,
          nameButton: 'back',
          stationActionType: 'cancel',
        });
        if (this.setState({ isModalOpen: true })) {
          this.isBackButtonClicked = true;
        } else {
          window.history.pushState(null, null, window.location.pathname);
          this.isBackButtonClicked = false;
        }
      } else if (!savedChangesInNotes) {
        this.setIsUnsavedNotesDialogOpen(true);
      } else {
        window.history.back();
      }
    }
  };

  clearStationsChoosedTasksAndBoms = async () => {
    const {
      match,
      getLineJobTasks,
      clearLineJobStationsData,
      lineJobStations,
      getLineJobStationTasks,
      updateLineJobStationTasks,
      clearAddedStationBOMs,
    } = this.props;
    clearLineJobStationsData();
    getLineJobTasks(match.params.jobId);
    lineJobStations.forEach((item) =>
      getLineJobStationTasks(item.id).then((response) =>
        updateLineJobStationTasks(response.data),
      ),
    );
    clearAddedStationBOMs();
  };

  onHomeHandle = () => {
    const { history, savedChangesInNotes, savedChangesInDrawings } = this.props;
    const { isStationDataSavedChanges } = this.state;

    if (
      isStationDataSavedChanges &&
      savedChangesInNotes &&
      savedChangesInDrawings
    ) {
      history.push('/');
    } else if (isStationDataSavedChanges && !savedChangesInNotes) {
      this.setIsUnsavedNotesDialogOpen(true);
    } else {
      this.setState({
        isModalOpen: true,
        nameButton: 'home',
        stationActionType: 'cancel',
      });
    }
  };

  onBack = () => {
    const { isStationDataSavedChanges } = this.state;
    if (isStationDataSavedChanges) {
      window.history.back();
    } else {
      this.setState({
        isModalOpen: true,
        nameButton: 'back',
        stationActionType: 'cancel',
      });
    }
  };

  setIsUnsavedNotesDialogOpen = (isBack) => {
    const { isUnsavedNotesDialogOpen } = this.state;
    this.setState({
      isUnsavedNotesDialogOpen: !isUnsavedNotesDialogOpen,
      isBack,
    });
  };

  onStationDelete = async (stationId) => {
    const {
      deleteLineJobStation,
      getLineJobStations,
      getLineJobStationsWithDetails,
      lineJobStations,
      match,
      getLineJobStationDocuments,
      getLineJobStationDrawings,
      getLineJobID,
      getDrawingsLineJobID,
      getLineJobStationTasks,
      setLineJobStationTasks,
      getLineJobStationBOMs,
      setBOMsToStation,
      getChoosedLineJobBOMs,
      clearStationBOMS,
      getLineJobStationUnitChecksWithoutSettingToRedux,
      setIsStationHasUnitChecks,
      getLineUnitChecks,
      getLinejobVDRs,
      getSupervisorLineJobITPs,
      getLineJobStationVDRsWithoutSettingToRedux,
      getLineJobStationITPsWithoutSettingToRedux,
      setIsStationHasVDRs,
      setIsStationHasITPs,
      clearUnitChecks,
      clearVDRs,
      clearITPs,
    } = this.props;
    const findLineJobStationId = lineJobStations.find(
      (item) => item.stationId === stationId,
    ).id;
    await deleteLineJobStation(findLineJobStationId);

    clearStationBOMS();
    clearUnitChecks();
    clearVDRs();
    clearITPs();
    this.clearStationsChoosedTasksAndBoms();
    getLineJobStationsWithDetails(match.params.jobId);
    // getLineJobStations(match.params.jobId).then(
    //   (response) =>
    //     response &&
    //     response.data.forEach((lineJob) => {
    //       getLineJobStationDocuments(lineJob.id).then(
    //         (response) => response && getLineJobID(response.data, lineJob.id),
    //       );
    //       getLineJobStationDrawings(lineJob.id).then(
    //         (response) =>
    //           response && getDrawingsLineJobID(response.data, lineJob.id),
    //       );
    //       getLineJobStationUnitChecksWithoutSettingToRedux(lineJob.id).then(
    //         (response) =>
    //           response &&
    //           setIsStationHasUnitChecks(response.data.length > 1, lineJob.id),
    //       );
    //       getLineJobStationTasks(lineJob.id).then(
    //         (response) =>
    //           response && setLineJobStationTasks(response.data, lineJob.id),
    //       );
    //       getLineJobStationVDRsWithoutSettingToRedux(lineJob.id).then(
    //         (response) =>
    //           response &&
    //           setIsStationHasVDRs(response.data.length > 0, lineJob.id),
    //       );
    //       getLineJobStationITPsWithoutSettingToRedux(lineJob.id).then(
    //         (response) =>
    //           response &&
    //           setIsStationHasITPs(response.data.length > 0, lineJob.id),
    //       );
    //       getLineJobStationBOMs(lineJob.id).then(
    //         (response) => response && setBOMsToStation(response.data),
    //       );
    //     }),
    // );
    getChoosedLineJobBOMs(match.params.jobId);
    getLineUnitChecks(match.params.jobId);
    getLinejobVDRs(match.params.jobId);
    getSupervisorLineJobITPs(match.params.jobId);
  };

  addNewStation = () => {
    const {
      isStationDataSavedChanges,
      selectedStationBySelect,
      openedStation,
    } = this.state;
    const {
      clearStationDrawings,
      clearLineJobStationsWidgetsData,
      clearUnitChecks,
      getLineJobTasks,
      match,
      clearVDRs,
      clearITPs,
      savedChangesInDrawings,
      handleUnsavedChangesInDrawings,
    } = this.props;
    const prevOpenedStation = openedStation;
    if (!isStationDataSavedChanges || !savedChangesInDrawings) {
      this.setState({
        isAddNewStation: true,
        isNotCloseOpenedBlock: true,
      });
      this.stationAction('cancel', prevOpenedStation, selectedStationBySelect);

      this.myDivToFocus.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
      handleUnsavedChangesInDrawings(true);
      return;
    }
    clearLineJobStationsWidgetsData();
    clearStationDrawings();
    clearUnitChecks();
    clearVDRs();
    clearITPs();
    getLineJobTasks(match.params.jobId);
    this.setState({
      isAddNewStation: true,
      openedStation: '',
      isStationDataSavedChanges: true,
      savedStationName: '',
      selectedStationBySelect: {},
    });
    this.myDivToFocus.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  onStationSave = async (selectedStation, initialStation) => {
    const {
      match,
      saveLineJobStation,
      getLineJobStations,
      getLineJobStationsWithDetails,
      stationDocuments,
      lineJobStationsDocuments,
      history,
      getLineJobStationDocuments,
      getLineJobStationDrawings,
      getLineJobID,
      getDrawingsLineJobID,
      lineJobStationTasks,
      stationTasks,
      getLineJobStationTasks,
      setLineJobStationTasks,
      clearJobDetailsData,
      clearLineJobStationsData,
      addedStationsBoms,
      clearStationBOMS,
      getLineJobStationBOMs,
      setBOMsToStation,
      getChoosedLineJobBOMs,
      getLineJobTasks,
      lineTasks,
      lineJobStations,
      stationWidgetUnitChecks,
      widgetFA,
      lineJobUnitChecks,
      getLineUnitChecks,
      getLineJobStationUnitChecksWithoutSettingToRedux,
      setIsStationHasUnitChecks,
      getLinejobVDRs,
      getSupervisorLineJobITPs,
      getLineJobStationVDRsWithoutSettingToRedux,
      getLineJobStationITPsWithoutSettingToRedux,
      setIsStationHasVDRs,
      setIsStationHasITPs,
      stationWidgetVDRs,
      stationWidgetITPs,
      getLineJobDrawings,
      initialStationBOMs,
    } = this.props;
    const {
      nameButton,
      isNotCloseOpenedBlock,
      openedStationId,
      isAddNewStation,
    } = this.state;
    if (!isNotCloseOpenedBlock) {
      this.setState({ isAddNewStation: false, openedStation: '' });
    }
    const stationId = selectedStation.id
      ? selectedStation.id
      : initialStation.stationId;
    const lineJobStationTasksToSave = lineJobStationTasks.filter(
      (item) => item.stationId === stationId,
    );
    const isStationWasChanged =
      !isAddNewStation &&
      selectedStation.id &&
      selectedStation.id !== initialStation.stationId;

    const foundLineJobStation =
      initialStation &&
      lineJobStations.find((item) => item.id === initialStation.id);
    const lineJobStationTasksToAdd = foundLineJobStation
      ? lineJobStationTasks.filter(
          (item) => item.stationId === foundLineJobStation.stationId,
        )
      : null;
    const stationsToAddIds =
      !!lineJobStationTasksToAdd &&
      lineJobStationTasksToAdd.map((item) => item.lineJobTaskId);
    const updatedStationTasks = lineTasks.map((item) =>
      stationsToAddIds && stationsToAddIds.includes(item.id)
        ? { ...item, isChecked: true }
        : item,
    );

    const newStationsToSave = isStationWasChanged
      ? [...updatedStationTasks]
      : [...stationTasks];
    const tasksArray = [
      ...newStationsToSave
        .filter((item) => item.isChecked)
        .map((item, i) => ({
          id: null,
          lineJobTaskId: item.id,
          sortIndex: item.sortIndex,
        })),
      ...lineJobStationTasksToSave.map((item, i) => ({
        id: item.id,
        lineJobTaskId: item.lineJobTaskId,
        sortIndex: item.sortIndex,
      })),
    ];
    const firstArticle =
      initialStation && widgetFA?.length
        ? widgetFA
        : lineJobUnitChecks.filter((item) => item.text === FIRST_ARTICLE);

    const unitChecksArray = [
      ...firstArticle.map((item) => ({ ...item, sortIndex: 0 })),
      ...stationWidgetUnitChecks
        .filter((item) => item.text !== FIRST_ARTICLE)
        .map((item, i) => ({ ...item, sortIndex: i + 1 })),
    ].map((item) => ({
      id: item.lineJobUnitCheckId ? item.id : null,
      lineJobUnitCheckId: item.lineJobUnitCheckId || item.id,
      sortIndex: item.sortIndex,
    }));

    const vdrsArray = stationWidgetVDRs.map((item) => ({
      id: item.lineJobStationId ? item.id : null,
      vdrId: item.vdrId,
      sequence: item.sequence,
      subject: item.subject,
      sortIndex: item.sortIndex,
    }));

    const itpsArray = stationWidgetITPs.map((item) => ({
      id: item.lineJobStationId ? item.id : null,
      lineJobItpId: item.lineJobItpId || item.id,
    }));
    const configureArray = (array, savedItemsArray) =>
      array.map((item, i) =>
        isNaN(item.sortIndex)
          ? { ...item, sortIndex: savedItemsArray.length + i }
          : item,
      );
    const lineJobStationsDocumentsIDs = lineJobStationsDocuments.map(
      (item) => item.id,
    );

    const foundInitialBomItem = (item) =>
      initialStationBOMs.find((bomItem) => bomItem.bom.id === item.bom.id);
    const body = {
      id: initialStation ? initialStation.id : null,
      stationId,
      lineJobId: match.params.jobId,
      documents: [
        ...lineJobStationsDocuments.map((doc) => ({
          id: doc.lineJobDocumentId ? doc.id : null,
          lineJobDocumentId: doc.lineJobDocumentId || doc.id,
        })),
        ...stationDocuments
          .filter(
            (doc) =>
              doc.isChecked && !lineJobStationsDocumentsIDs.includes(doc.id),
          )
          .map((doc) => ({
            id: null,
            lineJobDocumentId: doc.id,
          })),
      ]
        .filter((item) => item.lineJobDocumentId)
        .map((doc, i) => ({ ...doc, sortIndex: i + 1 })),
      tasks: [
        ...sortBy(
          configureArray(tasksArray, lineJobStationTasksToSave),
          'sortIndex',
        ),
      ],
      unitChecks: [...sortBy(unitChecksArray, 'sortIndex')],
      vdrs: [...sortBy(vdrsArray, 'sortIndex')],
      itps: [...itpsArray],
      boms: [
        ...addedStationsBoms.map((item) => ({
          id: foundInitialBomItem(item) ? foundInitialBomItem(item).id : null,
          lineJobBomId: item.lineJobBomId,
          annotation: item.bom.annotation,
        })),
      ],
    };

    const response = await saveLineJobStation(body).then((res) => {
      this.setState({ isDataLoading: false });
      return res;
    });
    this.updateSupervisorDrawings(
      response.data.id || openedStationId,
      initialStation,
    );
    clearLineJobStationsData();
    clearStationBOMS();
    clearJobDetailsData();

    Promise.all([
      getLineJobDrawings(match.params.jobId),
      getLineUnitChecks(match.params.jobId),
      getLinejobVDRs(match.params.jobId),
      getSupervisorLineJobITPs(match.params.jobId),
      getLineJobStationDocuments(match.params.jobId),
      getLineJobStationDrawings(match.params.jobId),
      getChoosedLineJobBOMs(match.params.jobId),
      getLineJobTasks(match.params.jobId),
      getLineJobStationsWithDetails(match.params.jobId),
      // getLineJobStations(match.params.jobId).then(
      //   (response) =>
      //     response &&
      //     response.data.forEach((lineJob) => {
      //       getLineJobStationDocuments(lineJob.id).then(
      //         (response) => response && getLineJobID(response.data, lineJob.id),
      //       );
      //       getLineJobStationDrawings(lineJob.id).then(
      //         (response) =>
      //           response && getDrawingsLineJobID(response.data, lineJob.id),
      //       );
      //       getLineJobStationTasks(lineJob.id).then(
      //         (response) =>
      //           response && setLineJobStationTasks(response.data, lineJob.id),
      //       );
      //       getLineJobStationBOMs(lineJob.id).then(
      //         (response) =>
      //           response &&
      //           nameButton.length === 0 &&
      //           setBOMsToStation(response.data),
      //       );
      //       getLineJobStationVDRsWithoutSettingToRedux(lineJob.id).then(
      //         (response) =>
      //           response &&
      //           setIsStationHasVDRs(response.data.length > 0, lineJob.id),
      //       );
      //       getLineJobStationITPsWithoutSettingToRedux(lineJob.id).then(
      //         (response) =>
      //           response &&
      //           setIsStationHasITPs(response.data.length > 0, lineJob.id),
      //       );
      //       getLineJobStationUnitChecksWithoutSettingToRedux(lineJob.id).then(
      //         (response) =>
      //           response &&
      //           setIsStationHasUnitChecks(response.data.length > 1, lineJob.id),
      //       );
      //     }),
      // ),
    ]).then(() => this.setState({ isDataLoading: false }));
    this.setState({
      isNotCloseOpenedBlock: false,
      openedStation: '',
      selectedStationBySelect: '',
      isAddNewStation: false,
      savedStationName: '',
      isStationDataSavedChanges: true,
    });

    if (nameButton.length > 0) {
      history.push('/');
      this.setState({ isModalOpen: false });
    }
  };

  updateSupervisorDrawings = async (openedStationId, initialStation) => {
    const {
      handleUnsavedChangesInDrawings,
      createdStationId,
      saveSupervisorDrawings,
      stationDrawings,
      modifiedFiles,
      lineJobStationsDrawings,
    } = this.props;
    const modifiedFilesNames = modifiedFiles.map((item) => item.name);
    const lineJobStationsDrawingsIDs = lineJobStationsDrawings.map(
      (item) => item.id,
    );
    const unreplacedFiles = [
      ...stationDrawings
        .filter(
          (drw) => drw.isChecked && !modifiedFilesNames.includes(drw.fileName),
        )
        .map((drw) => ({
          id: null,
          lineJobDrawingId: drw.id,
          addedPosition: drw.addedPosition,
        })),
      ...lineJobStationsDrawings
        .filter(
          (drw) =>
            !modifiedFilesNames.includes(drw.fileName || drw.drawing.fileName),
        )
        .map((drw) => ({
          id: drw.id,
          lineJobDrawingId: drw.lineJobDrawingId,
          sortIndex: drw.sortIndex,
        })),
    ];
    const replacedFiles = [
      ...stationDrawings
        .filter(
          (drw) => drw.isChecked && modifiedFilesNames.includes(drw.fileName),
        )
        .map((drw, i) => ({
          id: null,
          lineJobDrawingId: drw.id,
          addedPosition: drw.addedPosition,
        })),
      ...lineJobStationsDrawings
        .filter((drw) =>
          modifiedFilesNames.includes(drw.fileName || drw.drawing.fileName),
        )
        .map((drw) => ({
          id: drw.id,
          lineJobDrawingId: drw.lineJobDrawingId,
          sortIndex: drw.sortIndex,
        })),
    ];

    const unsavedUnmodifiedDrawings = unreplacedFiles.filter(
      (item) => item.addedPosition && !item.sortIndex,
    );
    const unsavedModifiedDrawings = replacedFiles.filter(
      (item) => item.addedPosition && !item.sortIndex,
    );
    const savedUnmodifiedDrawings = unreplacedFiles.filter(
      (item) => !item.addedPosition && item.sortIndex,
    );
    const savedModifiedDrawings = replacedFiles.filter(
      (item) => !item.addedPosition && item.sortIndex,
    );

    const jsonData = JSON.stringify({
      id: initialStation ? initialStation.id : createdStationId,
      drawings: !modifiedFiles.length
        ? [
            ...lineJobStationsDrawings.map((drw) => ({
              id: drw.lineJobDrawingId ? drw.id : null,
              lineJobDrawingId: drw.lineJobDrawingId || drw.id,
            })),
            ...stationDrawings
              .filter(
                (drw) =>
                  drw.isChecked && !lineJobStationsDrawingsIDs.includes(drw.id),
              )
              .map((drw) => ({
                id: null,
                lineJobDrawingId: drw.id,
              })),
          ]
            .filter((item) => item.lineJobDrawingId)
            .map((drw, i) => ({ ...drw, sortIndex: i + 1 }))
        : [
            ...sortBy(
              [
                ...savedUnmodifiedDrawings,
                ...savedModifiedDrawings.map((drw) => ({
                  ...drw,
                  index: modifiedFilesNames.indexOf(
                    modifiedFiles.find(
                      (file) => file.id === (drw.id || drw.lineJobDrawingId),
                    ) &&
                      modifiedFiles.find(
                        (file) => file.id === (drw.id || drw.lineJobDrawingId),
                      ).name,
                  ),
                })),
              ],
              'sortIndex',
            ),
            ...sortBy(
              [
                ...unsavedUnmodifiedDrawings,
                ...unsavedModifiedDrawings.map((drw) => ({
                  ...drw,
                  index: modifiedFilesNames.indexOf(
                    modifiedFiles.find(
                      (file) => file.id === (drw.id || drw.lineJobDrawingId),
                    ) &&
                      modifiedFiles.find(
                        (file) => file.id === (drw.id || drw.lineJobDrawingId),
                      ).name,
                  ),
                })),
              ],
              'addedPosition',
            ).map((drw) => ({
              index: drw.index,
              id: drw.id,
              lineJobDrawingId: drw.lineJobDrawingId,
            })),
          ]
            .map((drw, i) => ({
              ...drw,
              sortIndex: i + 1,
              hasAnnotations:
                modifiedFiles.find(
                  (file) => file.id === (drw.id || drw.lineJobDrawingId),
                ) &&
                modifiedFiles.find(
                  (file) => file.id === (drw.id || drw.lineJobDrawingId),
                ).hasAnnotations,
            }))
            .filter((item) => item.lineJobDrawingId),
    });

    const formData = new FormData();

    if (modifiedFiles.length > 0) {
      for (let i = 0; i < modifiedFiles.length; i++) {
        formData.append(
          'NewDrawingFiles',
          modifiedFiles[i].pdf || modifiedFiles[i],
          modifiedFiles[i].name,
        );
      }
    } else {
      formData.append('NewDrawingFiles', []);
    }

    formData.append('JsonData', jsonData);

    handleUnsavedChangesInDrawings(true);
    await saveSupervisorDrawings(openedStationId, formData);
  };

  confirmModal = () => {
    const {
      stationActionType,
      selectedStationBySelect,
      savedStationName,
      nextOpenStation,
    } = this.state;
    const { lineStations, lineJobStations } = this.props;
    const foundedSavedStation = lineStations.find(
      (item) => item.name === savedStationName,
    );
    const initialStation = lineJobStations.find(
      (item) => item.name === savedStationName,
    );

    switch (stationActionType) {
      case 'delete':
        this.onStationDelete(foundedSavedStation.id);
        break;
      case 'cancel':
        this.onStationSave(selectedStationBySelect, initialStation);
        break;
      default:
        // do nothing;
        break;
    }
    this.setState({
      openedStation: nextOpenStation,
      isModalOpen: false,
      stationActionType: '',
      isStationDataSavedChanges: true,
      isNotCloseOpenedBlock: false,
    });
  };

  closeModal = () => {
    const {
      lineStations,
      getLineJobTasks,
      match,
      lineJobStations,
      getLineJobStationTasks,
      setLineJobStationTasks,
      clearStationDrawings,
      clearJobDetailsData,
      clearLineJobStationsWidgetsData,
      clearUnitChecks,
      clearVDRs,
      clearITPs,
      handleUnsavedChangesInDrawings,
    } = this.props;
    const {
      stationActionType,
      savedStationName,
      isAddNewStation,
      nextOpenStation,
    } = this.state;
    const findStation = lineStations.find(
      (item) => item.name === nextOpenStation,
    );

    switch (stationActionType) {
      case 'delete':
        this.setState({ isModalOpen: false, selectedStationBySelect: {} });
        clearLineJobStationsWidgetsData();
        this.onCloseStationCollapse();
        getLineJobTasks(match.params.jobId);
        clearJobDetailsData();
        clearUnitChecks();
        clearVDRs();
        clearITPs();
        return;
      case 'cancel':
        if (isAddNewStation) {
          this.setState({
            isModalOpen: false,
            openedStation: '',
            savedStationName: '',
          });
          this.onCloseStationCollapse();
          clearLineJobStationsWidgetsData();
          clearJobDetailsData();
          clearUnitChecks();
          clearStationDrawings();
          clearVDRs();
          clearITPs();
          getLineJobTasks(match.params.jobId);
          lineJobStations.forEach((lineJob) => {
            getLineJobStationTasks(lineJob.id).then(
              (response) =>
                response && setLineJobStationTasks(response.data, lineJob.id),
            );
          });
          return;
        }
        this.setState({
          isModalOpen: false,
          openedStation: findStation ? findStation.name : '',
        });
        clearLineJobStationsWidgetsData();
        clearUnitChecks();
        clearStationDrawings();
        clearVDRs();
        clearITPs();
        handleUnsavedChangesInDrawings(true);
        this.onCloseStationCollapse();
        getLineJobTasks(match.params.jobId);
        lineJobStations.forEach((lineJob) => {
          getLineJobStationTasks(lineJob.id).then(
            (response) =>
              response && setLineJobStationTasks(response.data, lineJob.id),
          );
        });
        clearJobDetailsData();
        if (nextOpenStation.length > 0) {
          this.openStationData(nextOpenStation);
        }
        break;
      default:
        // do nothing;
        break;
    }
    this.setState({ stationActionType: '', isNotCloseOpenedBlock: false });
    if (savedStationName === 'SELECT STATION') {
      this.setState({ isAddNewStation: true });
    }
  };

  stationAction = (actionType, savedStationName) => {
    const {
      lineJobStations,
      lineStations,
      clearUnitChecks,
      clearVDRs,
      clearITPs,
      clearLineJobStationsWidgetsData,
      getLineJobTasks,
      match,
      savedChangesInDrawings,
    } = this.props;
    const {
      isAddNewStation,
      isNotCloseOpenedBlock,
      isStationDataSavedChanges,
      selectedStationBySelect,
    } = this.state;
    this.setState({
      savedStationName,
    });
    if (isAddNewStation && isNotCloseOpenedBlock) {
      this.setState({ isAddNewStation: false });
    }
    const initialStation = lineJobStations.find(
      (item) => item.name === savedStationName,
    );
    const initialSelectedStation = lineStations.find(
      (item) => item.name === savedStationName,
    );
    const selectedStationData = selectedStationBySelect.id
      ? selectedStationBySelect
      : initialSelectedStation;
    switch (actionType) {
      case 'cancel':
        if (isStationDataSavedChanges && savedChangesInDrawings) {
          clearLineJobStationsWidgetsData();
          clearUnitChecks();
          clearVDRs();
          clearITPs();
          getLineJobTasks(match.params.jobId);
          this.setState({
            openedStation: '',
            savedStationName: '',
            isAddNewStation: false,
          });
        } else {
          this.setState({ stationActionType: actionType, isModalOpen: true });
        }
        return;
      case 'delete':
        clearLineJobStationsWidgetsData();
        clearUnitChecks();
        clearVDRs();
        clearITPs();
        getLineJobTasks(match.params.jobId);
        if (selectedStationBySelect.name === 'SELECT STATION') {
          this.setState({ openedStation: '', savedStationName: '' });
          return;
        }
        this.setState({ stationActionType: actionType, isModalOpen: true });
        return;
      case 'save':
        this.setState({ isDataLoading: true });
        if (!isStationDataSavedChanges || !savedChangesInDrawings) {
          this.onStationSave(selectedStationData, initialStation);
          this.setState({ isStationDataSavedChanges: true });
        } else {
          clearLineJobStationsWidgetsData();
          clearUnitChecks();
          clearVDRs();
          clearITPs();
          getLineJobTasks(match.params.jobId);
          this.setState({ openedStation: '', savedStationName: '' });
        }
        this.setState({ isDataLoading: false });
        break;
      default:
        // do nothing;
        break;
    }
  };

  onCloseStationCollapse = () => {
    const { isNotCloseOpenedBlock, nameButton } = this.state;
    const { history } = this.props;
    if (!isNotCloseOpenedBlock) {
      this.setState({
        nextOpenStation: '',
        openedStation: '',
        isAddNewStation: false,
        selectedStationBySelect: {},
      });
    } else {
      this.setState({
        isModalOpen: false,
        nextOpenStation: '',
        isNotCloseOpenedBlock: false,
        selectedStationBySelect: {},
      });
    }
    this.setIsStationChangesSaved(true);
    if (nameButton.length > 0) {
      history.push('/');
      this.setState({ isModalOpen: false });
    }
  };

  setIsStationChangesSaved = (status) => {
    this.setState({ isStationDataSavedChanges: status });
  };

  setStationDataForActions = (selectedStation, savedStationName) => {
    this.setState({
      savedStationName,
    });
  };

  removeDocument = (file) => {
    const {
      updateLineJobStationDocuments,
      removeDocumentsToStaton,
      lineJobStationsDocuments,
      stationDocuments,
    } = this.props;
    if (file.lineJobDocumentId) {
      const updatedDocs = lineJobStationsDocuments.filter(
        (doc) => doc.id !== file.id,
      );
      updateLineJobStationDocuments(updatedDocs);
      this.setState({ isStationDataSavedChanges: false });
    } else {
      const updatedDocs = stationDocuments.map((doc) =>
        doc.id === file.id ? { ...doc, isChecked: false } : doc,
      );
      if (updatedDocs.every((doc) => !doc.isChecked)) {
        this.setState({ isStationDataSavedChanges: true });
      }
      removeDocumentsToStaton({
        stationDocuments: updatedDocs,
        id: file.id,
      });
    }
  };

  removeDrawing = (file) => {
    const {
      updateLineJobStationDrawings,
      removeDrawingsToStaton,
      lineJobStationsDrawings,
      stationDrawings,
      modifiedFiles,
      updateModifiedDrawingsFiles,
    } = this.props;
    if (
      modifiedFiles.length > 0 &&
      (file.name || file.fileName || file.drawing.fileName)
    ) {
      const updatedModifiedFilesArray = modifiedFiles.filter(
        (drwg) => drwg.id !== file.id,
      );
      updateModifiedDrawingsFiles(updatedModifiedFilesArray);
    }
    if (file.lineJobDrawingId) {
      const updatedDraws = lineJobStationsDrawings.filter(
        (doc) => doc.id !== file.id,
      );
      updateLineJobStationDrawings(updatedDraws);
      this.setState({ isStationDataSavedChanges: false });
    } else {
      const updatedDraws = stationDrawings.map((doc) =>
        doc.id === file.id ? { ...doc, isChecked: false } : doc,
      );
      if (updatedDraws.every((doc) => !doc.isChecked)) {
        this.setState({ isStationDataSavedChanges: true });
      }
      removeDrawingsToStaton({
        stationDrawings: updatedDraws,
        id: file.id,
      });
    }
  };

  removeTask = (task) => {
    const {
      updateLineJobStationTasks,
      removeTasksFromStaton,
      lineJobStationTasks,
      stationTasks,
    } = this.props;
    if (task.lineJobTaskId) {
      const updatedTasks = lineJobStationTasks
        .filter((item) => item.id !== task.id)
        .map((item, i) => ({ ...item, sortIndex: i }));
      updateLineJobStationTasks(updatedTasks);
      this.setState({ isStationDataSavedChanges: false });
    } else {
      const updatedTasks = stationTasks.map((item) =>
        item.id === task.id ? { ...item, isChecked: false } : item,
      );
      if (updatedTasks.every((item) => !item.isChecked)) {
        this.setState({ isStationDataSavedChanges: true });
      }

      removeTasksFromStaton({
        stationTasks: updatedTasks,
        id: task.id,
      });
    }
  };

  handleAddedEntities = () => {
    this.setState({ isStationDataSavedChanges: false });
  };

  onChangeSelectedStation = (selectedStationId, savedStationName) => {
    const { lineStations } = this.props;
    const findStation = lineStations.find(
      (item) => item.id === selectedStationId,
    );
    this.setState({ selectedStationBySelect: findStation, savedStationName });
  };

  closeOpenedStation = () => {
    const { handleUnsavedChangesInDrawings } = this.props;
    this.setState({ openedStation: '', isStationDataSavedChanges: true });
    handleUnsavedChangesInDrawings(true);
  };

  confirmNotificationBySupervisor = async (items) => {
    const {
      viewNotificationsModalAsSupervisor,
      getLineJobRevisionNotifications,
      match,
      clearLineJobStationsData,
      clearStationBOMS,
      clearUnitChecks,
      clearVDRs,
      clearITPs,
    } = this.props;

    clearLineJobStationsData();
    clearStationBOMS();
    clearUnitChecks();
    clearVDRs();
    clearITPs();
    const viewedItemsIDs = items.map((item) => item.id);

    await viewNotificationsModalAsSupervisor(viewedItemsIDs).then(() => {
      getLineJobRevisionNotifications(match.params.jobId);
      window.location.reload();
    });
    // window.location.reload();
  };

  render() {
    const {
      lineJobDetails,
      stationDocuments,
      stationDrawings,
      isLoading,
      isUpdatingPDF,
      lineJobStations,
      updateLineJobStationDocuments,
      updateLineJobStationDrawings,
      lineJobStationsDocuments,
      lineJobStationsDrawings,
      lineStations,
      notes,
      updateLineJobNotes,
      saveNotes,
      match,
      handleUnsavedChangesInNotes,
      clearJobDetailsData,
      addDocumentsToStaton,
      stationTasks,
      lineJobStationTasks,
      unsavedNotes,
      addedStationsBoms,
      setStationsBoms,
      updateStationTasks,
      updateLineJobStationTasks,
      savedChangesInDrawings,
      selectedLine,
      modalNotifications,
    } = this.props;
    const {
      isBack,
      isModalOpen,
      isAddNewStation,
      openedStation,
      isLoaderDisable,
      isStationDataSavedChanges,
      stationActionType,
      selectedStationBySelect,
      isUnsavedNotesDialogOpen,
      isDataLoading,
    } = this.state;
    const parsedLineJobDetails =
      lineJobDetails !== null
        ? {
            ...(lineJobDetails.salesOrder !== null && {
              so: lineJobDetails.salesOrder.number,
            }),
            // so: lineJobDetails.salesOrder.number,
            wo: lineJobDetails.workOrder.number,
            assembly: lineJobDetails.assembly,
            customer: lineJobDetails.customer.name,
            description: lineJobDetails.description,
            queuePosition: lineJobDetails.queuePosition.name,
          }
        : {};
    const lineJobStationsIDs = lineJobStations.map((item) => item.stationId);
    const updatedLineStations = lineStations.map((item) => {
      if (lineJobStationsIDs.includes(item.id)) {
        return { ...item, isStationChoosed: true };
      }
      return item;
    });

    const sortedStations = sortByStationIndex(updatedLineStations);
    const filteredNotificationsForStation = modalNotifications.filter(
      (item) => item.lineJobId === match.params.jobId,
    );
    const groupedModalNotifications = groupingArrayOfObjectsByKey(
      filteredNotificationsForStation,
      'createdDateTime',
    );
    return (
      <JobDetailsWrapper>
        <NavigationPanel
          data={parsedLineJobDetails}
          onHomeHandle={this.onHomeHandle}
          onBack={this.onBack}
        />
        <JobDetailsActionsBlock
          selectedLine={selectedLine}
          isStationChangesSaved={
            isStationDataSavedChanges && savedChangesInDrawings
          }
          addNewStation={this.addNewStation}
          closeOpenedStation={this.closeOpenedStation}
        />
        <JobDetailsContent>
          <SideBarWrapper>
            <Tabs
              isBack={isBack}
              isDataLoading={isDataLoading}
              openedStation={
                openedStation.length > 0 || !selectedStationBySelect.name
                  ? openedStation
                  : selectedStationBySelect.name
              }
              addedNotes={notes.text}
              updateLineJobNotes={updateLineJobNotes}
              updateNotes={saveNotes}
              id={match.params.jobId}
              setIsStationChangesSaved={this.setIsStationChangesSaved}
              handleAddedEntities={this.handleAddedEntities}
              handleUnsavedChangesInNotes={handleUnsavedChangesInNotes}
              isAddNewStation={isAddNewStation}
              unsavedNotes={unsavedNotes}
              isUnsavedNotesDialogOpen={isUnsavedNotesDialogOpen}
              setIsUnsavedNotesDialogOpen={this.setIsUnsavedNotesDialogOpen}
            />
          </SideBarWrapper>
          <MainContentWrapper>
            {sortedStations.map(
              (station) =>
                station.isStationChoosed && (
                  <StationWidget
                    key={`${station.name}-${station.id}`}
                    stationName={station.name}
                    isDataLoading={isDataLoading}
                    openStationData={this.openStationData}
                    expanded={openedStation === station.name}
                    lineJobStations={lineJobStations}
                    setStationsBoms={setStationsBoms}
                    stationTasks={checkStationTasks(
                      station,
                      lineJobStationTasks,
                    )}
                  >
                    <StationMainData
                      removeDocument={this.removeDocument}
                      removeDrawing={this.removeDrawing}
                      removeTask={this.removeTask}
                      stationDocuments={uniqBy(
                        [
                          ...sortBy(lineJobStationsDocuments, 'sortIndex'),
                          ...stationDocuments.filter((file) => file.isChecked),
                        ],
                        'fileName',
                      )}
                      stationDrawings={uniqBy(
                        [
                          ...sortBy(lineJobStationsDrawings, 'sortIndex'),
                          ...stationDrawings.filter((file) => file.isChecked),
                        ],
                        'id',
                      )}
                      updateLineJobStationDocuments={
                        updateLineJobStationDocuments
                      }
                      updateLineJobStationDrawings={
                        updateLineJobStationDrawings
                      }
                      stationTasks={[
                        ...sortBy(
                          checkStationTasks(station, lineJobStationTasks),
                          'sortIndex',
                        ),
                        ...stationTasks.filter((file) => file.isChecked),
                      ]}
                      stationBoms={[...addedStationsBoms]}
                      addDocumentsToStaton={addDocumentsToStaton}
                      lineJobStations={lineJobStations}
                      stations={updateStationSelect(
                        lineStations,
                        station,
                        sortedStations,
                      )}
                      savedStationName={station.name}
                      isStationDataSavedChanges={
                        isStationDataSavedChanges && savedChangesInDrawings
                      }
                      stationAction={this.stationAction}
                      isClearStation={openedStation === station.name}
                      setStationDataForActions={this.setStationDataForActions}
                      changeSelectedStation={this.onChangeSelectedStation}
                      selectedStationBySelect={selectedStationBySelect}
                      clearJobDetailsData={clearJobDetailsData}
                      setIsStationChangesSaved={this.setIsStationChangesSaved}
                      handleAddedEntities={this.handleAddedEntities}
                      updateStationTasks={updateStationTasks}
                      updateLineJobStationTasks={updateLineJobStationTasks}
                    />
                  </StationWidget>
                ),
            )}
            <Fade className='supervisor-fade-block' in={isAddNewStation}>
              <div ref={this.myDivToFocus}>
                <StationMainData
                  stations={sortedStations}
                  removeDocument={this.removeDocument}
                  removeDrawing={this.removeDrawing}
                  removeTask={this.removeTask}
                  stationDocuments={uniqBy(
                    [
                      ...sortBy(lineJobStationsDocuments, 'sortIndex'),
                      ...stationDocuments.filter((file) => file.isChecked),
                    ],
                    'fileName',
                  )}
                  stationDrawings={uniqBy(
                    [
                      ...sortBy(lineJobStationsDrawings, 'sortIndex'),
                      ...stationDrawings.filter((file) => file.isChecked),
                    ],
                    'id',
                  )}
                  stationTasks={[
                    ...sortBy(
                      checkStationTasks(
                        selectedStationBySelect,
                        lineJobStationTasks,
                      ),
                      'sortIndex',
                    ),
                    ...stationTasks.filter((file) => file.isChecked),
                  ]}
                  stationBoms={[...addedStationsBoms]}
                  savedStationName='SELECT STATION'
                  isStationDataSavedChanges={
                    isStationDataSavedChanges && savedChangesInDrawings
                  }
                  stationAction={this.stationAction}
                  isAddNewStation={isAddNewStation}
                  clearJobDetailsData={clearJobDetailsData}
                  setStationDataForActions={this.setStationDataForActions}
                  changeSelectedStation={this.onChangeSelectedStation}
                  selectedStationBySelect={selectedStationBySelect}
                  setIsStationChangesSaved={this.setIsStationChangesSaved}
                  handleAddedEntities={this.handleAddedEntities}
                  updateLineJobStationTasks={updateLineJobStationTasks}
                  updateStationTasks={updateStationTasks}
                />
              </div>
            </Fade>
          </MainContentWrapper>
        </JobDetailsContent>
        <ModalDialog
          open={isModalOpen}
          buttonsNames={getModalButtons(stationActionType)}
          onClose={this.closeModal}
          headerText={getModalHeaderText(stationActionType)}
          bodyText={getModalBodyText(stationActionType)}
          onClickCancel={this.closeModal}
          onClickConfirm={this.confirmModal}
        />
        <Loader open={isLoading || isUpdatingPDF || !isLoaderDisable} />
        {groupedModalNotifications.length > 0 && (
          <IssueRevisionInfo
            open
            workOrder={parsedLineJobDetails.wo}
            modalNotification={groupedModalNotifications[0]}
            onClickConfirm={() =>
              this.confirmNotificationBySupervisor(groupedModalNotifications[0])
            }
          />
        )}
      </JobDetailsWrapper>
    );
  }
}

JobDetailsSupervisor.propTypes = {
  lineStations: PropTypes.instanceOf(Array),
  lineJobStations: PropTypes.instanceOf(Array),
  stationDocuments: PropTypes.instanceOf(Array),
  lineJobDetails: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  getLineStations: PropTypes.func,
  getLineJobStations: PropTypes.func,
  getLineJobStationsWithDetails: PropTypes.func,
  getLineJobStationDocuments: PropTypes.func,
  getLineJobStationDrawings: PropTypes.func,
  updateLineJobStationDocuments: PropTypes.func,
  getLineJobsSupervisor: PropTypes.func,
  saveLineJobStation: PropTypes.func,
  deleteLineJobStation: PropTypes.func,
  clearLineJobStationsData: PropTypes.func,
  getLineJobDetails: PropTypes.func,
  addDocumentsToStaton: PropTypes.func,
  removeDocumentsToStaton: PropTypes.func,
  removeDrawingsToStaton: PropTypes.func,
  updateLineJobNotes: PropTypes.func,
  getLineJobNotes: PropTypes.func,
  handleUnsavedChangesInNotes: PropTypes.func,
  clearJobDetailsData: PropTypes.func,
  getLineJobID: PropTypes.func,
  getDrawingsLineJobID: PropTypes.func,
  getLineJobStationTasks: PropTypes.func,
  setLineJobStationTasks: PropTypes.func,
  getLineJobStationBOMs: PropTypes.func,
  setBOMsToStation: PropTypes.func,
  selectedLine: PropTypes.string,
  isLoading: PropTypes.bool,
  getLineJobStationDetails: PropTypes.func,
  setLineJobStationDetails: PropTypes.func,
};

const mapStateToProps = (state) => ({
  drawings: state.jobDetails.drawings,
  lineJobDetails: state.lines.lineJobDetails,
  isLinesLoading: state.lines.loading,
  lineStations: state.supervisorJobDetails.lineStations,
  lineJobStations: state.supervisorJobDetails.lineJobStations,
  lineJobStationsDocuments: state.supervisorJobDetails.lineJobStationsDocuments,
  lineJobStationsDocumentsList:
    state.supervisorJobDetails.lineJobStationsDocumentsList,
  lineJobStationsDrawings: state.drawings.lineJobStationsDrawings,
  stationDocuments: state.jobDetails.stationDocuments,
  stationDrawings: state.jobDetails.stationDrawings,
  modifiedFiles: state.jobDetails.modifiedFiles,
  isLoading: state.supervisorJobDetails.loading,
  isUpdatingPDF: state.jobDetails.loading,
  lineJobStationTasks: state.supervisorJobDetails.lineJobStationTasks,
  lineTasks: state.supervisorJobDetails.lineTasks,
  stationTasks: state.supervisorJobDetails.stationTasks,
  stationBOMs: state.supervisorJobDetails.stationBOMs,
  addedStationsBoms: state.supervisorJobDetails.addedStationsBoms,
  setStationsBoms: state.supervisorJobDetails.setStationsBoms,
  notes: state.jobDetails.jobNotes,
  supervisorLineBOMs: state.supervisorJobDetails.supervisorLineBOMs,
  savedChangesInNotes: state.jobDetails.savedChangesInNotes,
  savedChangesInDrawings: state.jobDetails.savedChangesInDrawings,
  initialStationBOMs: state.supervisorJobDetails.initialStationBOMs,
  stationWidgetUnitChecks: state.supervisorJobDetails.widgetUnitChecks,
  widgetFA: state.supervisorJobDetails.widgetFA,
  lineJobUnitChecks: state.supervisorJobDetails.lineJobUnitChecks,
  stationWidgetVDRs: state.supervisorJobDetails.widgetVDRs,
  stationWidgetITPs: state.supervisorJobDetails.widgetITPs,
  createdStationId: state.supervisorJobDetails.createdStationId,
  modalNotifications: state.issueRevision.lineJobModalNotifications,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLineStations,
      getLineJobStations,
      getLineJobStationsWithDetails,
      getLineJobsSupervisor,
      saveLineJobStation,
      deleteLineJobStation,
      clearLineJobStationsData,
      getLineJobDetails,
      addDocumentsToStaton,
      getLineJobStationDocuments,
      getLineJobStationDrawings,
      updateLineJobStationDocuments,
      updateLineJobStationDrawings,
      updateLineJobStationTasks,
      getLineJobNotes,
      updateLineJobNotes,
      saveNotes,
      handleUnsavedChangesInNotes,
      clearJobDetailsData,
      getLineJobID,
      getDrawingsLineJobID,
      getLineJobTasks,
      getLineJobStationTasks,
      setLineJobStationTasks,
      addTasksToStation,
      clearLineJobStationsWidgetsData,
      getLineJobStationBOMs,
      addBOMsToStation,
      setBOMsToStation,
      clearAddedStationBOMs,
      updateChoseLineJobBOMs,
      removeDocumentsToStaton,
      removeDrawingsToStaton,
      setInitialStationBoms,
      clearStationBOMS,
      updateStationTasks,
      removeTasksFromStaton,
      getChoosedLineJobBOMs,
      updateLineTasks,
      clearAddedStationTasks,
      getLineJobStationUnitChecks,
      getLineJobStationUnitChecksWithoutSettingToRedux,
      getLineUnitChecks,
      setIsStationHasUnitChecks,
      clearUnitChecks,
      getLinejobVDRs,
      getSupervisorLineJobITPs,
      getLineJobStationVDRs,
      getLineJobStationITPs,
      getLineJobStationVDRsWithoutSettingToRedux,
      getLineJobStationITPsWithoutSettingToRedux,
      setIsStationHasVDRs,
      setIsStationHasITPs,
      clearVDRs,
      clearITPs,
      saveSupervisorDrawings,
      handleUnsavedChangesInDrawings,
      getTemplates,
      clearStationDrawings,
      updateModifiedDrawingsFiles,
      getLineJobDrawings,
      getLineJobRevisionNotifications,
      getLineJobRevisedElementTypes,
      viewNotificationsModalAsSupervisor,
      getLineJobStationDetails,
      setLineJobStationDetails,
    },
    dispatch,
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(JobDetailsSupervisor);
