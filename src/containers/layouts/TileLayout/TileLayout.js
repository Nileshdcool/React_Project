import * as PropTypes from 'prop-types';

import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ACTIVATE_JOB_MODAL_HEADER,
  ACTIVATE_JOB_MODAL_TEXT,
  BUTTONS_TEXT,
  CREATE_JOB_MODAL_HEADER,
  CREATE_JOB_MODAL_TEXT,
  LINES,
  WARNING_MODAL_HEADER,
  WARNING_MODALS_TYPES,
  WARNING_MODALS_TEXT_MAP,
  MAX_ACTIVE_LINE_JOBS_COUNT,
} from '../../../constants';
import { getLineJobsSupervisor, getLineJobsPlanner, getLines, updateLineJobQueue } from '../../../actions/lines';

import Loader from '../../../components/Loader/Loader';
import ModalDialog from '../../../components/ModalDialog';
import TileJobLine from './components/TileJobLine';
import { TileWrapper } from './styledComponents';
import { filterJobsByParam } from '../../../utils/arrayFilters';

const initialRoles = {
  planner: false,
  supervisor: false,
  leadman: false,
  operator: false,
  admin: false,
};

class TileLayout extends Component {
  state = {
    isQueueUpdating: false,
    isConfirmChangingQueueModalOpen: false,
    changingJobQueueData: null,
    isActivateJob: false,
    warningModalType: null,
  }

  getLineJobsByRole = (requestData) => {
    const { getLineJobsSupervisor, getLineJobsPlanner, roleView } = this.props;
    const roles = JSON.parse(localStorage.getItem('USER_ROLE'));
    const isSupervisorLeadmanRole = roles?.supervisor || roles?.leadman;

    if (roles?.planner || (roles?.admin && roleView === 'planner')) {
      getLineJobsPlanner(requestData);
    }
    if (isSupervisorLeadmanRole || (roles?.admin && roleView === 'supervisor')) {
      getLineJobsSupervisor(requestData);
    }
  }


  componentDidMount() {
    const { selectedLine } = this.props;
    window.onbeforeunload = () => {
      this.onClearLocalStorage();
    };
    this.getLineJobsByRole(selectedLine);
    if (selectedLine && selectedLine.length > 0) {
      this.timeout = this.reloadDataTimer();
    }
  }

  async componentDidUpdate(prevProps) {
    const { roleView, selectedLine } = this.props;
    const roles = JSON.parse(localStorage.getItem('USER_ROLE'));

    if (roles?.admin && prevProps.roleView !== roleView) {
      this.getLineJobsByRole(selectedLine);
      if (selectedLine && selectedLine.length > 0) {
        this.timeout = this.reloadDataTimer();
      }
    }
  }

  onClearLocalStorage = () => {
    localStorage.setItem('USER_ROLE', JSON.stringify({...initialRoles}));
  }

  componentWillUnmount() {
    clearInterval(this.timeout)
  }

  reloadDataTimer = () => {
    const { selectedLine } = this.props;
    setInterval( () => {
      const localStoreLineId = localStorage.getItem('SELECTED_LINEJOBS');
      const lineId = localStoreLineId === null ? selectedLine : localStoreLineId;

      this.getLineJobsByRole(lineId);
    }, 30000);
  }

  onDragEnd = async (result) => {
    const {
      lineJobs, queuePositions, updateLineJobQueue, selectedLine,
      newlineJobs, createdLineJobs, stagedLineJobs, activeLineJobs, roleView
    } = this.props;
    const localStorageUserRole = JSON.parse(localStorage.getItem('USER_ROLE'));
    const isPlannerRole = localStorageUserRole.planner || (localStorageUserRole.admin && roleView === 'planner');
    const isSupervisorRole = localStorageUserRole.supervisor
      || localStorageUserRole.leadman
      || (localStorageUserRole.admin && roleView === 'supervisor');
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    const start = source.droppableId;
    const finish = destination.droppableId;

    const draggableJobCard = lineJobs.filter(item => item.jobId === draggableId);
    const droppableArea = queuePositions.filter(item => item.name === destination.droppableId);
    const draggableJobCardIndex = lineJobs.map(item => item.jobId).indexOf(draggableId);
    const newQueuePosition = queuePositions.find(item => item.name === droppableArea[0].name);

    if (isPlannerRole && (
      (start !== LINES.NEW
      && start !== LINES.CREATED)
      || (finish !== LINES.CREATED
      && finish !== LINES.NEW))) {
      return;
    }
    if (
      isSupervisorRole
      && activeLineJobs.length >= MAX_ACTIVE_LINE_JOBS_COUNT
      && finish === LINES.ACTIVE && start !== LINES.ACTIVE
    ) {
      this.setState({ warningModalType: WARNING_MODALS_TYPES.tooManyActiveJobs });
      return;
    }
    if (isSupervisorRole && start === LINES.ACTIVE) {
      this.setState({ warningModalType: WARNING_MODALS_TYPES.orderChanging });
    }

    if (isSupervisorRole && (
      start === LINES.CREATED
      && [LINES.ACTIVE, LINES.STAGED].includes(finish)
      && draggableJobCard[0].numberOfStationSetUp < 1
    )) {
      this.setState({ warningModalType: WARNING_MODALS_TYPES.setupJobStation });
      return;
    }

    let updatedSectionsJob = [];
    if (LINES.NEW === destination.droppableId) {
      updatedSectionsJob = [...newlineJobs];
    } else if (LINES.CREATED === destination.droppableId) {
      updatedSectionsJob = [...createdLineJobs];
    } else if (LINES.STAGED === destination.droppableId) {
      updatedSectionsJob = [...stagedLineJobs];
    } else {
      updatedSectionsJob = [...activeLineJobs];
    }

    const jobCardWithNewPosition = {
      ...draggableJobCard[0],
      queuePosition: newQueuePosition,
    };

    if (destination.droppableId === source.droppableId) {
      updatedSectionsJob.splice(source.index, 1);
      updatedSectionsJob.splice(destination.index, 0, draggableJobCard[0]);
    } else {
      updatedSectionsJob.splice(destination.index, 0, draggableJobCard[0]);
    }

    const body = {
      lineJobId: draggableJobCard[0].id,
      queuePosition: newQueuePosition.id,
      items: updatedSectionsJob.map((item, i) => ({ id: item.id, index: i })),
    };

    const lineJobId = draggableJobCard[0].id;

    const subLineJobsQueue = [...lineJobs];
    subLineJobsQueue[draggableJobCardIndex] = jobCardWithNewPosition;

    const isCreateJob = start === LINES.NEW && finish === LINES.CREATED;
    const isActivePhase = finish === LINES.ACTIVE;
    if (isCreateJob || isActivePhase) {
      this.setState({
        changingJobQueueData: {
          subLineJobsQueue,
          lineJobId,
          body,
        },
        isConfirmChangingQueueModalOpen: source.droppableId !== destination.droppableId,
        isActivateJob: isActivePhase,
      });
      if (source.droppableId === destination.droppableId) {
        await updateLineJobQueue(lineJobId, body).then(this.setState({ isQueueUpdating: true }));
        this.getLineJobsByRole(selectedLine);
      }
      return;
    }
    await updateLineJobQueue(lineJobId, body).then(this.setState({ isQueueUpdating: true }));

    this.getLineJobsByRole(selectedLine);
  }

  onRejectLinejobDrag = () => {
    this.setState({
      isConfirmChangingQueueModalOpen: false,
      changingJobQueueData: null,
    });
  }

  onConfirmLinejobDrag = async () => {
    const { changingJobQueueData } = this.state;
    const {
      updateLineJobQueue, selectedLine,
    } = this.props;
    const {
      lineJobId,
      body,
    } = changingJobQueueData;

    this.setState({
      isConfirmChangingQueueModalOpen: false,
      changingJobQueueData: null,
    });
    await updateLineJobQueue(lineJobId, body).then(this.setState({ isQueueUpdating: true }));
    this.getLineJobsByRole(selectedLine);
  }

  render() {
    const {
      queuePositions, isLoading,
      newlineJobs, createdLineJobs, stagedLineJobs, activeLineJobs,
    } = this.props;
    const {
      isQueueUpdating,
      isConfirmChangingQueueModalOpen,
      isActivateJob,
      warningModalType,
    } = this.state;
    const jobs = [...newlineJobs, ...createdLineJobs, ...stagedLineJobs, ...activeLineJobs];
    return (
      <TileWrapper>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {queuePositions.map(item => (
            <TileJobLine
              title={item.description.toUpperCase()}
              id={item.name}
              key={item.id}
              jobs={filterJobsByParam(jobs, 'queuePosition', item.id)}
            />
          ))}
        </DragDropContext>
        <Loader open={isLoading && isQueueUpdating} />
        <ModalDialog
          open={isConfirmChangingQueueModalOpen}
          buttonsNames={
            isActivateJob ? {
              confirmButtonText: BUTTONS_TEXT.activate,
              cancelButtonText: BUTTONS_TEXT.cancel,
            }
              : {
                confirmButtonText: BUTTONS_TEXT.create,
                cancelButtonText: BUTTONS_TEXT.cancel,
              }
          }
          onClose={this.closeModal}
          headerText={isActivateJob ? ACTIVATE_JOB_MODAL_HEADER : CREATE_JOB_MODAL_HEADER}
          bodyText={isActivateJob ? ACTIVATE_JOB_MODAL_TEXT : CREATE_JOB_MODAL_TEXT}
          onClickCancel={this.onRejectLinejobDrag}
          onClickConfirm={this.onConfirmLinejobDrag}
        />
        <ModalDialog
          open={!!warningModalType}
          buttonsNames={{
            confirmButtonText: BUTTONS_TEXT.ok,
            cancelButtonText: '',
          }}
          informationDialog
          onClose={() => this.setState({ warningModalType: null })}
          headerText={WARNING_MODAL_HEADER}
          bodyText={WARNING_MODALS_TEXT_MAP[warningModalType]}
          onClickConfirm={() => this.setState({ warningModalType: null })}
        />
      </TileWrapper>
    );
  }
}

TileLayout.propTypes = {
  lineJobs: PropTypes.instanceOf(Array).isRequired,
  queuePositions: PropTypes.instanceOf(Array).isRequired,
  selectedLine: PropTypes.string,
  updateLineJobQueue: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  errorData: state.lines.error,
  lineJobs: state.lines.lineJobs,
  isLoading: state.lines.linesLoading,
  newlineJobs: state.lines.newlineJobs,
  createdLineJobs: state.lines.createdlineJobs,
  stagedLineJobs: state.lines.stagedlineJobs,
  activeLineJobs: state.lines.activelineJobs,
  roleView: state.changeViewStore.view,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getLines, getLineJobsSupervisor, getLineJobsPlanner, updateLineJobQueue,
  }, dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TileLayout);
