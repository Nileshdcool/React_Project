import * as signalR from "@aspnet/signalr";
import Fade from "@material-ui/core/Fade";
import sortBy from "lodash/sortBy";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators, compose } from "redux";

import { lineJobStationSaveFile } from "../../../../actions/drawings";
import {
  clearRevisionNotificationDate,
  sendAutomaticIssueRevision,
  sendManualIssueRevision
} from "../../../../actions/issueRevision";
import {
  clearJobDetailsData,
  createLineJob,
  getExternalVDRs,
  getLineJobBOMs,
  getLineJobDetails,
  getLineJobDocuments,
  getLineJobDrawings,
  getLineJobITPs,
  getLineJobNotes,
  handleUnsavedChanges,
  handleUnsavedChangesInAnnotations,
  handleUnsavedChangesInBOM,
  handleUnsavedChangesInDocuments,
  handleUnsavedChangesInDrawings,
  handleUnsavedChangesInITPs,
  handleUnsavedChangesInNotes,
  liveUpdateBoms,
  resetUploadedFilesData,
  updateBoms,
  updateLineJobDetails,
  updateLineJobStatus,
  uploadLineJobDocuments,
  uploadLineJobDrawings
} from "../../../../actions/jobDetails";
import { getLineJobsPlanner } from "../../../../actions/lines";
import {
  clearRecentFilesData,
  getRecentFiles,
  moveRecentFile
} from "../../../../actions/recentFiles";
import { getLineJobStatuses } from "../../../../actions/statuses";
import ContainedButton from "../../../../components/Buttons/ContainedButton";
import Loader from "../../../../components/Loader/Loader";
import ModalDialog from "../../../../components/ModalDialog";
import CreateIssueRevision from "../../../../components/ModalDialog/IssueRevision/CreateIssueRevision";
import {
  BUTTONS_TEXT,
  CREATE_JOB_MODAL_HEADER,
  CREATE_JOB_MODAL_TEXT,
  ISSUE_REVISION_MODAL_HEADER,
  LINES,
  UNSAVED_MODAL_HEADER,
  UNSAVED_MODAL_TEXT,
  widgetsTitles
} from "../../../../constants";
import { BASE_URL } from "../../MonitorLayout/MonitorLayout";
import BOM from "./components/BOMWidget/BOMWidget";
import DocumentsWidget from "./components/DocumentsWidget/DocumentsWidget";
import DrawingsWidget from "./components/DrawingsWidget/DrawingsWidget";
import ITPWidget from "./components/ITPWidget/ITPWidget";
import NavigationPanel from "./components/NavigationPanel";
import NotesWidget from "./components/NotesWidget/NotesWidget";
import RecentFilesWidget from "./components/RecentFilesWidget/RecentFilesWidget";
import VDRWidget from "./components/VDRWidget/VDRWidget";
import {
  ActionsBlock,
  FirstWidgetsLine,
  JobDetailsContent,
  JobDetailsWrapper, MainContentButtons,
  MainContentWrapper,
  RevisionText,
  SecondWidgetsLine,
  StyledWarningIcon,
  TextMessagesBlock,
  UnsavedChangesWarning,
  WidgetsBlock
} from "./styledComponents";

const getDocumentsOrDrawingsIDs = (array) => (
  array ? array.filter(item => item.id).map(item => item.id) : []
);
const getDrawingsIDs = (array) => (
  array ? array.filter(item => item.id).map(item => ({ id: item.id })) : []
);

class JobDetailsPlanner extends Component {
  constructor() {
    super();
    this.isBackButtonClicked = false;
  }

  state = {
    isModalOpen: false,
    nameButton: "",
    isLoaderDisable: false,
    isCreateJobModalOpen: false,
    isCreateIssueRevisionModalOpen: false,
    isAutomaticIR: false,
    isBrowserBackButton: false,
    issueRevisionText: "",
    issueRevisionRole: {
      operator: false,
      supervisor: true
    },
    isLoadingOnSave: false,
    automaticIssueRevisionRequestBodyData: null,
    isIssueRevisionWasEdited: false
  };

  async componentDidMount() {
    this.getLineJobData();

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", this.onBackButtonEvent);

    this.initRecentFileChangesConnection();
  }

  getLineJobData = () => {
    const {
      getLineJobStatuses,
      getLineJobDetails,
      match,
      getLineJobDrawings,
      getLineJobDocuments,
      getLineJobBOMs,
      getLineJobNotes,
      getLineJobITPs,
      getExternalVDRs,
      getRecentFiles,
      selectedLine,
      getLineJobsPlanner
    } = this.props;
    Promise.all([
      getLineJobsPlanner(selectedLine),
      getLineJobStatuses()
        .then(getLineJobDetails(match.params.jobId))
        .then(getLineJobDrawings(match.params.jobId))
        .then(getLineJobDocuments(match.params.jobId))
        .then(getLineJobBOMs(match.params.jobId))
        .then(getLineJobDocuments(match.params.jobId))
        .then(getLineJobNotes(match.params.jobId))
        .then(getLineJobITPs(match.params.jobId))
        .then(getExternalVDRs(match.params.jobId))
        .then(getRecentFiles(match.params.jobId))
    ]);
  };

  componentWillUnmount() {
    this.setState({ isLoaderDisable: true, isBrowserBackButton: false });
    const {
      getLineJobsPlanner,
      selectedLine,
      clearJobDetailsData,
      clearRecentFilesData,
      clearRevisionNotificationDate
    } = this.props;
    getLineJobsPlanner(selectedLine);
    this.setState({ isLoaderDisable: false });
    clearJobDetailsData();
    clearRecentFilesData();
    clearRevisionNotificationDate();
    window.removeEventListener("popstate", this.onBackButtonEvent);
  }

  componentDidUpdate() {
    const isAllChangesSaved = this.haveUnsaved();

    if (!isAllChangesSaved) {
      window.onbeforeunload = (evt) => {
        const message = "";
        if (evt) {
          evt.returnValue = message;
        }
        return message;
      };
    } else {
      window.onbeforeunload = null;
    }
  }

  initRecentFileChangesConnection = () => {
    const { match, getRecentFiles } = this.props;
    const recentFileChangesConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}/recentFileChangesHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();
    recentFileChangesConnection.on("RecentFileChangesNotifications", response => {
      if (match.params.jobId && response.lineJobId && response.lineJobId === match.params.jobId) {
        getRecentFiles(match.params.jobId);
      }
    });
    const start = async () => {
      try {
        await recentFileChangesConnection.start();
      } catch (err) {
        console.error(err);
        setTimeout(() => start(), 5000);
      }
    };
    recentFileChangesConnection.onclose(async () => {
      await start();
    });
    start();
  };

  onBackButtonEvent = (e) => {
    const isAllChangesSaved = this.haveUnsaved();
    e.preventDefault();
    if (!this.isBackButtonClicked) {
      if (!isAllChangesSaved) {
        if (this.setState({ isModalOpen: true, isBrowserBackButton: true })) {
          this.isBackButtonClicked = true;
        } else {
          window.history.pushState(null, null, window.location.pathname);
          this.isBackButtonClicked = false;
        }
      } else {
        window.history.back();
      }
    }
  };

  haveUnsaved = () => this.props.savedChangesInDocuments
    && this.props.savedChangesInDrawings
    && this.props.savedChangesInBOM
    && this.props.savedChangesInNotes
    && this.props.savedChangesInAnnotations
    && this.props.savedChangesInITPs;

  onSelectHandle = async (e) => {
    const { getLineJobDetails, match, updateLineJobStatus } = this.props;
    const { jobId } = match.params;
    const data = {
      lineJobId: jobId,
      statusId: +e.target.value
    };
    if (e.target.value) {
      this.setState({ isLoaderDisable: true });
      await updateLineJobStatus(jobId, data).then(this.setState({ isLoaderDisable: true }))
        .then(() => getLineJobDetails(match.params.jobId));
      this.setState({ isLoaderDisable: false });
    }
  };

  onHomeHandle = () => {
    const { history } = this.props;
    const isAllChangesSaved = this.haveUnsaved();

    if (isAllChangesSaved) {
      history.push("/");
    } else {
      this.setState({ isModalOpen: true, nameButton: "home" });
    }
  };

  onBack = () => {
    const isAllChangesSaved = this.haveUnsaved();
    if (isAllChangesSaved) {
      window.history.back();
    } else {
      this.setState({ isModalOpen: true, nameButton: "back" });
    }
  };

  onSaveJobDetails = async (isUnsavedChanges) => {
    await this.setState({ isLoadingOnSave: true });
    await this.saveJobDetails(isUnsavedChanges);
  }

  saveJobDetails = async (isUnsavedChanges) => {
    const {
      checkedBoms,
      clearRecentFilesData,
      documents,
      drawings,
      recentDocuments,
      recentDrawings,
      getLineJobITPs,
      getLineJobNotes,
      getLineJobBOMs,
      getLineJobDrawings,
      getLineJobDocuments,
      handleUnsavedChangesInDrawings,
      handleUnsavedChangesInBOM,
      handleUnsavedChangesInNotes,
      handleUnsavedChangesInAnnotations,
      handleUnsavedChangesInDocuments,
      handleUnsavedChangesInITPs,
      history,
      match,
      planerITPs,
      resetUploadedFilesData,
      lineJobDetails,
      liveUpdatedBoms,
      notes,
      unsavedNotes,
      updateLineJobDetails,
      uploadedDocuments,
      uploadedDrawings,
      lineJobStationSaveFile,
      moveRecentFile
    } = this.props;

    const isAllChangesSaved = this.haveUnsaved();
    const { nameButton, isBrowserBackButton } = this.state;
    const { jobId } = match.params;

    if (recentDocuments.length || recentDrawings.length) {
      const newFilesArray = [...recentDocuments, ...recentDrawings];

      const formData = new FormData();
      formData.append("JsonData", JSON.stringify(newFilesArray));
      const body = formData;

      moveRecentFile(jobId, body).then((response) => {
        if (response && response.data) {
          const issueRevisionText = response.data.lineJobRevisionNotifications?.filter(item =>
            !item.viewed).map(item => item.message).join('\n\n') || '';
          this.setState({ issueRevisionText, automaticIssueRevisionRequestBodyData: response.data });
          return true;
        }
        throw new Error(response);
      }).then(async () =>
        await resetUploadedFilesData()).then(async () => {
        let keepFilesDrawings = [];
        let keepFilesDocuments = [];
        await Promise.all([
          getLineJobDrawings(jobId).then(response => keepFilesDrawings = [...response.data]),
          getLineJobDocuments(jobId).then(response => keepFilesDocuments = [...response.data]),
        ]);
        return { keepFilesDrawings, keepFilesDocuments };
      })
        .then(async ({ keepFilesDrawings, keepFilesDocuments }) => {
          const notesForSave = unsavedNotes !== notes.text ? { id: '', text: unsavedNotes }
            : { id: notes.id, text: notes.text };

          const documentsNewState = getDocumentsOrDrawingsIDs(keepFilesDocuments);
          const drawingsNewState = getDrawingsIDs(keepFilesDrawings);
          const jsonData = {
            id: jobId,
            documents: documentsNewState,
            drawings: drawingsNewState,
            notes: notesForSave,
            boms: isBrowserBackButton && liveUpdatedBoms.length
              ? liveUpdatedBoms
                .filter(bom => bom.isDeleted === false)
                .map(bom => ({ id: bom.id, annotation: bom.annotation }))
              : checkedBoms
                .filter(bom => bom.isDeleted === false)
                .map(bom => ({ id: bom.id, annotation: bom.annotation })),
            itps: [...planerITPs],
            recentFileChangesDrawings: [],
            recentFileChangesDocuments: [],
          };
          const formData = new FormData();
          // if (uploadedDocuments.length > 0) {
          //   for (let i = 0; i < uploadedDocuments.length; i++) {
          //     formData.append('NewDocumentFiles', uploadedDocuments[i], uploadedDocuments[i].name);
          //   }
          // } else {
          //   formData.append('NewDocumentFiles', []);
          // }

          formData.append('JsonData', JSON.stringify(jsonData));
          const body = formData;
          await updateLineJobDetails(jobId, body).then(async () =>
            await resetUploadedFilesData()).then(async () => {
            getLineJobDrawings(jobId);
            getLineJobDocuments(jobId);
            getLineJobNotes(jobId);
            getLineJobBOMs(jobId);
            getLineJobITPs(jobId);
            await this.setState({ isLoadingOnSave: false });
          })
            .catch((error) => {
              console.error(error);
              // TODO please handle all errors everywhere or create basic function to handle errors
            });
          handleUnsavedChangesInDocuments(true);
          handleUnsavedChangesInDrawings(true);
          handleUnsavedChangesInBOM(true);
          handleUnsavedChangesInNotes(true);
          handleUnsavedChangesInAnnotations(true);
          handleUnsavedChangesInITPs(true);
          clearRecentFilesData();
          if (!isAllChangesSaved && lineJobDetails.queuePosition.name !== LINES.NEW) {
            this.setState({
              issueRevisionRole: {
                operator: lineJobDetails && lineJobDetails.queuePosition.name === LINES.ACTIVE && lineJobDetails.inProgress,
                supervisor: true,
              },
              isCreateIssueRevisionModalOpen: true,
              isAutomaticIR: true,
            });
          }
          if (nameButton === 'home' || isUnsavedChanges) {
            history.push('/');
          }
        });

    }

    if (uploadedDocuments.length || uploadedDrawings.length) {
      const newFilesArray = [...uploadedDocuments, ...uploadedDrawings];

      const formData = new FormData();
      formData.append("JsonData", JSON.stringify(newFilesArray));
      const body = formData;
      lineJobStationSaveFile(jobId, body).then((response) => {
        if (response && response.data) {
          const issueRevisionText = response.data.lineJobRevisionNotifications?.filter(item =>
            !item.viewed).map(item => item.message).join("\n\n") || "";
          this.setState({ issueRevisionText, automaticIssueRevisionRequestBodyData: response.data });
          return true;
        }
        throw new Error(response);
      }).then(async () =>
        await resetUploadedFilesData()).then(async () => {
        let keepFilesDrawings = [];
        let keepFilesDocuments = [];
        await Promise.all([
          getLineJobDrawings(jobId).then(response => keepFilesDrawings = [...response.data]),
          getLineJobDocuments(jobId).then(response => keepFilesDocuments = [...response.data])
        ]);
        return { keepFilesDrawings, keepFilesDocuments };
      })
        .then(async ({ keepFilesDrawings, keepFilesDocuments }) => {
          const notesForSave = unsavedNotes !== notes.text ? { id: "", text: unsavedNotes }
            : { id: notes.id, text: notes.text };

          const documentsNewState = getDocumentsOrDrawingsIDs(keepFilesDocuments);
          const drawingsNewState = getDrawingsIDs(keepFilesDrawings);
          const jsonData = {
            id: jobId,
            documents: documentsNewState,
            drawings: drawingsNewState,
            notes: notesForSave,
            boms: isBrowserBackButton && liveUpdatedBoms.length
              ? liveUpdatedBoms
                .filter(bom => bom.isDeleted === false)
                .map(bom => ({ id: bom.id, annotation: bom.annotation }))
              : checkedBoms
                .filter(bom => bom.isDeleted === false)
                .map(bom => ({ id: bom.id, annotation: bom.annotation })),
            itps: [...planerITPs],
            recentFileChangesDrawings: [],
            recentFileChangesDocuments: []
          };
          const formData = new FormData();
          // if (uploadedDocuments.length > 0) {
          //   for (let i = 0; i < uploadedDocuments.length; i++) {
          //     formData.append('NewDocumentFiles', uploadedDocuments[i], uploadedDocuments[i].name);
          //   }
          // } else {
          //   formData.append('NewDocumentFiles', []);
          // }

          formData.append("JsonData", JSON.stringify(jsonData));
          const body = formData;
          await updateLineJobDetails(jobId, body).then(async () =>
            await resetUploadedFilesData()).then(async () => {
            getLineJobDrawings(jobId);
            getLineJobDocuments(jobId);
            getLineJobNotes(jobId);
            getLineJobBOMs(jobId);
            getLineJobITPs(jobId);
            await this.setState({ isLoadingOnSave: false });
          })
            .catch((error) => {
              console.error(error);
              // TODO please handle all errors everywhere or create basic function to handle errors
            });
          handleUnsavedChangesInDocuments(true);
          handleUnsavedChangesInDrawings(true);
          handleUnsavedChangesInBOM(true);
          handleUnsavedChangesInNotes(true);
          handleUnsavedChangesInAnnotations(true);
          handleUnsavedChangesInITPs(true);
          clearRecentFilesData();
          if (!isAllChangesSaved && lineJobDetails.queuePosition.name !== LINES.NEW) {
            this.setState({
              issueRevisionRole: {
                operator: lineJobDetails && lineJobDetails.queuePosition.name === LINES.ACTIVE && lineJobDetails.inProgress,
                supervisor: true
              },
              isCreateIssueRevisionModalOpen: true,
              isAutomaticIR: true
            });
          }
          if (nameButton === "home" || isUnsavedChanges) {
            history.push("/");
          }
        });
    }

    if (!recentDocuments.length && !recentDrawings.length
      && !uploadedDocuments.length && !uploadedDrawings.length) {
      const notesForSave = unsavedNotes !== notes.text ? { id: "", text: unsavedNotes }
        : { id: notes.id, text: notes.text };

      const documentsNewState = getDocumentsOrDrawingsIDs(documents);
      const drawingsNewState = getDrawingsIDs(drawings);
      const jsonData = {
        id: jobId,
        documents: documentsNewState,
        drawings: drawingsNewState,
        notes: notesForSave,
        boms: isBrowserBackButton && liveUpdatedBoms.length
          ? liveUpdatedBoms
            .filter(bom => bom.isDeleted === false)
            .map(bom => ({ id: bom.id, annotation: bom.annotation }))
          : checkedBoms
            .filter(bom => bom.isDeleted === false)
            .map(bom => ({ id: bom.id, annotation: bom.annotation })),
        itps: [...planerITPs],
        recentFileChangesDrawings: [],
        recentFileChangesDocuments: []
      };
      const formData = new FormData();
      // if (uploadedDocuments.length > 0) {
      //   for (let i = 0; i < uploadedDocuments.length; i++) {
      //     formData.append('NewDocumentFiles', uploadedDocuments[i], uploadedDocuments[i].name);
      //   }
      // } else {
      //   formData.append('NewDocumentFiles', []);
      // }

      formData.append("JsonData", JSON.stringify(jsonData));
      const body = formData;
      await updateLineJobDetails(jobId, body).then(response => {
        if (response && response.data) {
          const issueRevisionText = response.data.lineJobRevisionNotifications?.filter(item =>
            !item.viewed).map(item => item.message).join("\n\n") || "";
          this.setState({ issueRevisionText, automaticIssueRevisionRequestBodyData: response.data });
          return true;
        }
        throw new Error(response);
      }).then(async () =>
        await resetUploadedFilesData()).then(async () => {
        getLineJobDrawings(jobId);
        getLineJobDocuments(jobId);
        getLineJobNotes(jobId);
        getLineJobBOMs(jobId);
        getLineJobITPs(jobId);
        await this.setState({ isLoadingOnSave: false });
      })
        .catch((error) => {
          console.error(error);
          // TODO please handle all errors everywhere or create basic function to handle errors
        });
      handleUnsavedChangesInDocuments(true);
      handleUnsavedChangesInDrawings(true);
      handleUnsavedChangesInBOM(true);
      handleUnsavedChangesInNotes(true);
      handleUnsavedChangesInAnnotations(true);
      handleUnsavedChangesInITPs(true);
      clearRecentFilesData();
      if (!isAllChangesSaved && lineJobDetails.queuePosition.name !== LINES.NEW) {
        this.setState({
          issueRevisionRole: {
            operator: lineJobDetails && lineJobDetails.queuePosition.name === LINES.ACTIVE && lineJobDetails.inProgress,
            supervisor: true
          },
          isCreateIssueRevisionModalOpen: true,
          isAutomaticIR: true
        });
      }
      if (nameButton === "home" || isUnsavedChanges) {
        history.push("/");
      }
    }
  };

  cancelChanges = () => {
    const {
      handleUnsavedChangesInDocuments,
      handleUnsavedChangesInDrawings,
      handleUnsavedChangesInBOM,
      handleUnsavedChangesInNotes,
      handleUnsavedChangesInAnnotations,
      handleUnsavedChangesInITPs,
      clearJobDetailsData
    } = this.props;

    clearJobDetailsData();
    handleUnsavedChangesInDocuments(true);
    handleUnsavedChangesInDrawings(true);
    handleUnsavedChangesInBOM(true);
    handleUnsavedChangesInNotes(true);
    handleUnsavedChangesInAnnotations(true);
    handleUnsavedChangesInITPs(true);
    this.getLineJobData();
  };

  onCreateLineJob = async () => {
    const { createLineJob, getLineJobDetails, match } = this.props;
    const { jobId } = match.params;
    const body = { lineJobId: jobId };
    await createLineJob(jobId, body);
    await getLineJobDetails(jobId);
    this.setState({ isCreateJobModalOpen: false });
  };

  onCreateIssueRevision = () => {
    const { sendManualIssueRevision, sendAutomaticIssueRevision, match } = this.props;
    const {
      issueRevisionText,
      issueRevisionRole,
      isAutomaticIR,
      automaticIssueRevisionRequestBodyData,
      isIssueRevisionWasEdited
    } = this.state;
    if (isAutomaticIR) {
      sendAutomaticIssueRevision(match.params.jobId, {
        lineJobId: match.params.jobId,
        ...automaticIssueRevisionRequestBodyData,
        isTextEdited: isIssueRevisionWasEdited,
        text: `${issueRevisionText}`
      });
    } else {
      sendManualIssueRevision(match.params.jobId, {
        lineJobId: match.params.jobId,
        text: `${issueRevisionText}`,
        notifySupervisors: issueRevisionRole.supervisor,
        notifyOperators: issueRevisionRole.operator
      });
    }
    this.setState({ isIssueRevisionWasEdited: false });
    this.clearCreateIssueRevision();
  };

  onClearNotifications = async () => {
    this.clearCreateIssueRevision();
  };

  clearCreateIssueRevision = () => {
    this.setState({
      isCreateIssueRevisionModalOpen: false,
      isAutomaticIR: false,
      issueRevisionText: "",
      automaticIssueRevisionRequestBodyData: null
    });
  };

  closeModal = () => {
    const {
      history,
      handleUnsavedChangesInDocuments,
      handleUnsavedChangesInDrawings,
      handleUnsavedChangesInBOM,
      handleUnsavedChangesInNotes,
      handleUnsavedChangesInAnnotations,
      handleUnsavedChangesInITPs
    } = this.props;
    handleUnsavedChangesInDocuments(true);
    handleUnsavedChangesInDrawings(true);
    handleUnsavedChangesInBOM(true);
    handleUnsavedChangesInNotes(true);
    handleUnsavedChangesInAnnotations(true);
    handleUnsavedChangesInITPs(true);
    this.setState({ isModalOpen: false });
    history.push("/");
  };

  onChangeMessage = e => {
    this.setState({ issueRevisionText: `${e.target.value}`, isIssueRevisionWasEdited: true });
  };

  onChangeCheckbox = e => {
    const { issueRevisionRole } = this.state;
    this.setState({
      issueRevisionRole: {
        ...issueRevisionRole,
        [e.target.name]: e.target.checked
      }
    });
  };

  render() {
    const {
      isModalOpen,
      isLoaderDisable,
      isCreateJobModalOpen,
      isCreateIssueRevisionModalOpen,
      isAutomaticIR,
      issueRevisionText,
      issueRevisionRole,
      isLoadingOnSave
    } = this.state;
    const {
      match,
      jobStatuses,
      lineJobDetails,
      isJobDetailsLoading,
      isLinesLoading,
      savedChangesInNotes,
      handleUnsavedChangesInNotes,
      handleUnsavedChangesInBOM,
      handleUnsavedChangesInAnnotations,
      documents,
      drawings,
      notes,
      boms,
      checkedBoms,
      updateBoms,
      liveUpdateBoms,
      savedChangesInDocuments,
      savedChangesInDrawings,
      savedChangesInBOM,
      savedChangesInAnnotations,
      savedChangesInITPs,
      notificationDate,
      recentDocuments,
      recentDrawings,
      recentFilesList,
      lastNotifications,
      isRecentFilesLoaderOpen
    } = this.props;
    const isLoading = isJobDetailsLoading || isLinesLoading;
    const parsedLineJobDetails = lineJobDetails !== null ? {
      ...(lineJobDetails.salesOrder !== null && { so: lineJobDetails.salesOrder.number }),
      wo: lineJobDetails.workOrder.number,
      assembly: lineJobDetails.assembly,
      customer: lineJobDetails.customer.name,
      description: lineJobDetails.description,
      queuePosition: lineJobDetails.queuePosition.name
    } : {};
    const isNoJobStatus = lineJobDetails === null || lineJobDetails.status === null;
    const jobStatus = isNoJobStatus ? "Set job status" : lineJobDetails.status.description;
    const isAllChangesSaved = savedChangesInDocuments
      && savedChangesInDrawings
      && savedChangesInBOM
      && savedChangesInNotes
      && savedChangesInAnnotations
      && savedChangesInITPs;
    return (

      <JobDetailsWrapper>
        <NavigationPanel
          isStatusesUpdated={isLoaderDisable}
          data={parsedLineJobDetails}
          selectedValue={jobStatus}
          onSelectHandle={this.onSelectHandle}
          jobStatuses={jobStatuses}
          onHomeHandle={this.onHomeHandle}
          onBack={this.onBack}
          handleCreateJob={() => (parsedLineJobDetails.queuePosition === LINES.NEW
            ? this.setState({ isCreateJobModalOpen: true })
            : this.setState({
              issueRevisionRole: {
                operator: parsedLineJobDetails.queuePosition === LINES.ACTIVE && lineJobDetails && lineJobDetails.inProgress,
                supervisor: true
              },
              isCreateIssueRevisionModalOpen: true,
              isAutomaticIR: false

            }))}
        />
        <JobDetailsContent>
          <MainContentWrapper>
            <ActionsBlock>
              <TextMessagesBlock>
                <Fade in={notificationDate || lineJobDetails?.lastRevisionDate}>
                  <UnsavedChangesWarning>
                    <StyledWarningIcon type="warning" />
                    <RevisionText>
                      Revision Notification sent&nbsp;
                      {moment(notificationDate || lineJobDetails?.lastRevisionDate).format("MM/DD/YYYY")}
                    </RevisionText>
                  </UnsavedChangesWarning>
                </Fade>
                <Fade in={!isAllChangesSaved}>
                  <UnsavedChangesWarning>
                    <StyledWarningIcon type="errorColor" />
                    <p>There are unsaved changes detected. Click SAVE to apply the changes.</p>
                  </UnsavedChangesWarning>
                </Fade>
              </TextMessagesBlock>
              <MainContentButtons>
                <ContainedButton
                  variant="contained"
                  color="secondary"
                  colorType="white"
                  text={BUTTONS_TEXT.cancel}
                  onClick={this.cancelChanges}
                />
                <ContainedButton
                  variant="contained"
                  color="primary"
                  colorType="classic"
                  text={BUTTONS_TEXT.save}
                  onClick={() => this.onSaveJobDetails(false)}
                />
              </MainContentButtons>
            </ActionsBlock>
            <WidgetsBlock>
              <FirstWidgetsLine>
                <DrawingsWidget
                  title={widgetsTitles.drwg}
                  jobId={match.params.jobId}
                  onModalOpen={this.onModalOpen}
                />
                <BOM
                  title={widgetsTitles.boms}
                  boms={boms}
                  checkedBoms={checkedBoms}
                  updateBoms={updateBoms}
                  liveUpdateBoms={liveUpdateBoms}
                  savedChangesInAnnotations={savedChangesInAnnotations}
                  handleUnsavedChangesInBOM={handleUnsavedChangesInBOM}
                  handleUnsavedChangesInAnnotations={handleUnsavedChangesInAnnotations}
                />
                <ITPWidget
                  title={widgetsTitles.itps}
                  onModalOpen={this.onModalOpen}
                />
              </FirstWidgetsLine>
              <SecondWidgetsLine>
                <DocumentsWidget
                  title={widgetsTitles.docs}
                  onModalOpen={this.onModalOpen}
                  jobId={match.params.jobId}
                />
                <VDRWidget
                  title={widgetsTitles.vdrs}
                />
                <NotesWidget
                  title={widgetsTitles.notes}
                  savedNotes={notes.text}
                  handleUnsavedChangesInNotes={handleUnsavedChangesInNotes}
                />
              </SecondWidgetsLine>
            </WidgetsBlock>
          </MainContentWrapper>
          <RecentFilesWidget
            documents={documents}
            drawings={drawings}
            recentDocuments={recentDocuments}
            recentDrawings={recentDrawings}
            lineJobDetails={lineJobDetails}
            recentFilesList={recentFilesList}
          />
        </JobDetailsContent>

        <Loader open={isLoadingOnSave} />
        <Loader open={(isLoading && !isLoaderDisable)} />
        <Loader open={isRecentFilesLoaderOpen} />
        <ModalDialog
          open={isModalOpen}
          buttonsNames={{
            confirmButtonText: "SAVE",
            cancelButtonText: "DISCARD"
          }}
          onClose={this.closeModal}
          headerText={UNSAVED_MODAL_HEADER}
          bodyText={UNSAVED_MODAL_TEXT}
          onClickCancel={this.closeModal}
          onClickConfirm={() => this.onSaveJobDetails(true)}
        />
        <ModalDialog
          open={isCreateJobModalOpen}
          buttonsNames={{
            confirmButtonText: "CREATE",
            cancelButtonText: "CANCEL"
          }}
          onClose={this.closeModal}
          headerText={CREATE_JOB_MODAL_HEADER}
          bodyText={CREATE_JOB_MODAL_TEXT}
          onClickCancel={() => this.setState({ isCreateJobModalOpen: false })}
          onClickConfirm={this.onCreateLineJob}
        />
        <CreateIssueRevision
          open={isCreateIssueRevisionModalOpen}
          buttonsNames={{
            confirmButtonText: "SEND",
            cancelButtonText: isAutomaticIR ? "DON'T SEND" : "CANCEL"
          }}
          issueRevisionText={issueRevisionText}
          issueRevisionRole={issueRevisionRole}
          onClose={this.closeModal}
          notifications={lastNotifications}
          isAutomaticIR={isAutomaticIR}
          headerText={ISSUE_REVISION_MODAL_HEADER}
          onClickCancel={this.onClearNotifications}
          onClickConfirm={this.onCreateIssueRevision}
          onChangeMessage={this.onChangeMessage}
          onChangeCheckbox={this.onChangeCheckbox}
          jobType={parsedLineJobDetails.queuePosition}
          isJobInProgress={lineJobDetails && lineJobDetails.inProgress}
        />
      </JobDetailsWrapper>
    );
  }
}

const mapStateToProps = ({
  jobDetails, jobStatuses, lines, issueRevision, recentFiles
}) => ({
  boms: jobDetails.boms,
  checkedBoms: jobDetails.checkedBoms,
  documents: jobDetails.documents,
  drawings: jobDetails.drawings,
  jobStatuses: jobStatuses.jobStatuses,
  isLoadingStatuses: jobStatuses.loading,
  isJobDetailsLoading: jobDetails.loading,
  isLinesLoading: lines.loading,
  lastNotifications: issueRevision.lastNotifications,
  lineJobDetails: lines.lineJobDetails,
  liveUpdatedBoms: jobDetails.liveUpdatedBoms,
  modifiedFiles: jobDetails.modifiedFiles,
  notes: jobDetails.jobNotes,
  notificationDate: issueRevision.notificationDate,
  notifications: issueRevision.lineJobNotifications,
  planerITPs: jobDetails.planerITPs,
  recentFilesList: recentFiles.recentFilesList,
  recentDocuments: recentFiles.recentDocuments,
  recentDrawings: recentFiles.recentDrawings,
  isRecentFilesLoaderOpen: recentFiles.isRecentFilesLoaderOpen,
  savedChanges: jobDetails.savedChanges,
  savedChangesInDocuments: jobDetails.savedChangesInDocuments,
  savedChangesInDrawings: jobDetails.savedChangesInDrawings,
  savedChangesInBOM: jobDetails.savedChangesInBOM,
  savedChangesInNotes: jobDetails.savedChangesInNotes,
  savedChangesInAnnotations: jobDetails.savedChangesInAnnotations,
  savedChangesInITPs: jobDetails.savedChangesInITPs,
  unsavedNotes: jobDetails.unsavedNotes,
  uploadedDocuments: jobDetails.uploadedDocuments,
  uploadedDrawings: jobDetails.uploadedDrawings
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getLineJobStatuses,
  getLineJobDetails,
  updateLineJobStatus,
  getLineJobDrawings,
  getLineJobsPlanner,
  getLineJobDocuments,
  updateLineJobDetails,
  handleUnsavedChanges,
  handleUnsavedChangesInDocuments,
  handleUnsavedChangesInDrawings,
  handleUnsavedChangesInBOM,
  handleUnsavedChangesInNotes,
  handleUnsavedChangesInAnnotations,
  handleUnsavedChangesInITPs,
  getLineJobBOMs,
  uploadLineJobDocuments,
  uploadLineJobDrawings,
  clearJobDetailsData,
  resetUploadedFilesData,
  getLineJobNotes,
  updateBoms,
  liveUpdateBoms,
  createLineJob,
  getLineJobITPs,
  getExternalVDRs,
  sendManualIssueRevision,
  getRecentFiles,
  clearRecentFilesData,
  sendAutomaticIssueRevision,
  clearRevisionNotificationDate,
  lineJobStationSaveFile,
  moveRecentFile
}, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter)(JobDetailsPlanner);
