import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getLineJobsPlanner, getLineJobsSupervisor, updateLineJobQueue } from '../../../actions/lines';
import Loader from '../../../components/Loader/Loader';
import ModalDialog from '../../../components/ModalDialog';
import {
  ACTIVATE_JOB_MODAL_HEADER,
  ACTIVATE_JOB_MODAL_TEXT,
  BUTTONS_TEXT,
  CREATE_JOB_MODAL_HEADER,
  CREATE_JOB_MODAL_TEXT,
  LINES,
  MAX_ACTIVE_LINE_JOBS_COUNT,
  WARNING_MODAL_HEADER,
  WARNING_MODALS_TEXT_MAP,
  WARNING_MODALS_TYPES,
} from '../../../constants';
import { filterJobsByParam } from '../../../utils/arrayFilters';
import Table from './ContainerTable';

const initialRoles = {
  planner: false,
  supervisor: false,
  leadman: false,
  operator: false,
  admin: false,
};

class ListLayout extends Component {
  state = {
    isOnDrag: false,
    isQueueUpdating: false,
    orderBy: 'executionOrder',
    order: 'asc',
    linesOrders: {
      New: {
        order: 'asc',
        orderBy: 'executionOrder',
      },
      Created: {
        order: 'asc',
        orderBy: 'executionOrder',
      },
      Staged: {
        order: 'asc',
        orderBy: 'executionOrder',
      },
      Active: {
        order: 'asc',
        orderBy: 'executionOrder',
      },
    },
    isConfirmChangingQueueModalOpen: false,
    isActivateJob: false,
    changingJobQueueData: null,
    warningModalType: null,
  };

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

  async componentDidMount() {
    const { selectedLine } = this.props;

    window.onbeforeunload = () => {
      this.onClearLocalStorage();
    };
    this.getLineJobsByRole(selectedLine);
    if (selectedLine && selectedLine.length > 0) {
      this.timeout = this.reloadDataTimer();
    }
  }

  onClearLocalStorage = () => {
    localStorage.setItem('USER_ROLE', JSON.stringify({ ...initialRoles }));
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

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  reloadDataTimer = () => {
    const { selectedLine } = this.props;
    setInterval(() => {
      const localStoreLineId = localStorage.getItem('SELECTED_LINEJOBS');
      const lineId = localStoreLineId === null ? selectedLine : localStoreLineId;
      this.getLineJobsByRole(lineId);
    }, 30000);
  }

  sorting = (field, lineName) => {
    const { linesOrders } = this.state;
    const { orderBy, order } = linesOrders[lineName];

    const isAsc = orderBy === field && order === 'asc';
    linesOrders[lineName] = {
      order: isAsc ? 'desc' : 'asc',
      orderBy: field,
    };
    this.setState({
      linesOrders,
    });
  }

  onDragEnd = async (result) => {
    const {
      lineJobs, queuePositions, updateLineJobQueue, selectedLine,
      newLineJobs, createdLineJobs, stagedLineJobs, activeLineJobs, roleView,
    } = this.props;
    const localStorageUserRole = JSON.parse(localStorage.getItem('USER_ROLE'));
    const isPlannerRole = localStorageUserRole.planner || (localStorageUserRole.admin && roleView === 'planner');
    const isSupervisorRole = localStorageUserRole.supervisor
      || localStorageUserRole.leadman
      || (localStorageUserRole.admin && roleView === 'supervisor');

    const { destination, source, draggableId } = result;

    console.log("FIRST DATA", {destination, source, draggableId})
    if (!destination) {
      this.setState({
        isOnDrag: false,
      });
      return;
    }
    this.setState({
      isOnDrag: false,
    });
    const start = source.droppableId;
    const finish = destination.droppableId;

    const draggableJobCard = lineJobs.filter(item => item.jobId === draggableId);
    const droppableArea = queuePositions.filter(item => item.name === destination.droppableId);
    const draggableJobCardIndex = lineJobs.map(item => item.jobId).indexOf(draggableId);
    const jobCardWithNewPosition = {
      ...draggableJobCard[0],
      queuePosition: droppableArea[0],
    };


    console.log("FIRST DATA", {start, finish})

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
      updatedSectionsJob = [...newLineJobs];
    } else if (LINES.CREATED === destination.droppableId) {
      updatedSectionsJob = [...createdLineJobs];
    } else if (LINES.STAGED === destination.droppableId) {
      updatedSectionsJob = [...stagedLineJobs];
    } else {
      updatedSectionsJob = [...activeLineJobs];
    }

    if (destination.droppableId === source.droppableId) {
      updatedSectionsJob.splice(source.index, 1);
      updatedSectionsJob.splice(destination.index, 0, draggableJobCard[0]);
    } else {
      updatedSectionsJob.splice(destination.index, 0, draggableJobCard[0]);
    }

    const body = {
      lineJobId: draggableJobCard[0].id,
      queuePosition: droppableArea[0].id,
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

  onDragStart = () => {
    this.setState({
      isOnDrag: true,
    });
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
      queuePositions,
      isLoading,
      newLineJobs,
      createdLineJobs,
      stagedLineJobs,
      activeLineJobs,
    } = this.props;
    const {
      isOnDrag,
      isQueueUpdating,
      isConfirmChangingQueueModalOpen,
      linesOrders,
      isActivateJob,
      warningModalType,
    } = this.state;
    const jobs = [...newLineJobs, ...createdLineJobs, ...stagedLineJobs, ...activeLineJobs];
    return (
      <div className="lines-container">
        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
          {queuePositions.map((item) => {
            const { order, orderBy } = linesOrders[item.name];
            return (
              <Table
                key={`${item.id}-${item.name}`}
                title={item.description.toUpperCase()}
                line={item.name}
                jobs={filterJobsByParam(jobs, 'queuePosition', item.id)}
                isOnDrag={isOnDrag}
                createSortHandler={this.sorting}
                orderBy={orderBy}
                order={order}
              />
            );
          })}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.lines.linesLoading,
  newLineJobs: state.lines.newlineJobs,
  createdLineJobs: state.lines.createdlineJobs,
  stagedLineJobs: state.lines.stagedlineJobs,
  activeLineJobs: state.lines.activelineJobs,
  roleView: state.changeViewStore.view,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getLineJobsSupervisor,
  getLineJobsPlanner,
  updateLineJobQueue,
},
dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListLayout);
