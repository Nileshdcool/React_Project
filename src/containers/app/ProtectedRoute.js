import * as signalR from '@aspnet/signalr';
import sortBy from 'lodash/sortBy';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { getUserAuthRoles } from '../../actions/authorisation';
import {
  getLineJobRevisionNotifications,
  getOperatorRevisionNotifications, getSupervisorRevisionNotifications, setLineJobStationDeletedNotification,
} from '../../actions/issueRevision';
import {
  getLineJobsPlanner,
  getLineJobsSupervisor, getLines, getQueuePositionsPlanner, getQueuePositionsSupervisor,
} from '../../actions/lines';
import { setOperatorSignals } from '../../actions/monitorActions';
import { changeView } from '../../actions/roles';
import { MainLayout } from '../../components/MainLayout';
import { NON_AUTH_ROLE_REDIRECT_URL } from '../../constants';
import { checkIsInnerPage } from '../../utils/innerPagesChecking';
import JobDetailsPlanner from '../layouts/JobDetails/PlannerView/JobDetailsPlanner';
import JobDetailsSupervisor from '../layouts/JobDetails/SupervisorView/JobDetailsSupervisor';
import MonitorLayout, { BASE_URL } from '../layouts/MonitorLayout/MonitorLayout';
import OperatorLayout from '../layouts/OperatorLayout/OperatorLayout';
import OperatorLogin from '../layouts/OperatorLogin/OperatorLogin';
import AuthRoute from './AuthRoute/AuthRoute';
import { MainComponent } from './MainComponent/MainComponent';
import OperatorPrivateRoute from './OperatorPrivateRoute/OperatorPrivateRoute';

const initialRoles = {
  planner: false,
  supervisor: false,
  leadman: false,
  operator: false,
  admin: false,
};

class ProtectedRoute extends Component {
  state = {
    layoutViewType: 'lines',
    userRole: initialRoles,
    selectedLineId: '',
  }

  async componentDidMount() {
    const {
      getLines,
      getQueuePositionsPlanner,
      getQueuePositionsSupervisor,
      setOperatorSignals,
      alertSignals,
      getLineJobRevisionNotifications,
      getOperatorRevisionNotifications,
      getSupervisorRevisionNotifications,
      setLineJobStationDeletedNotification,
      getUserAuthRoles,
      changeView,
      roleView,
    } = this.props;
    let userRoles = {};

    window.onbeforeunload = () => {
      this.onClearLocalStorage();
    };

    await getUserAuthRoles().then(response => {
      if (response && response.data) {
        const storageRole = localStorage.getItem('ROLE_VIEW');
        changeView(storageRole || roleView);
        localStorage.setItem('USER_ROLE', JSON.stringify(response.data));
        this.setState({ userRole: response.data });
        userRoles = response.data;
      } else {
        localStorage.setItem('USER_ROLE', JSON.stringify(initialRoles));
        this.setState({ userRole: initialRoles });
      }
    });

    if (!userRoles.operator) {
      let lines;
      if (userRoles.admin || userRoles.leadman || userRoles.planner || userRoles.supervisor) {
        lines = await getLines();
      }
      const roles = JSON.parse(localStorage.getItem('USER_ROLE'));
      const storageRole = localStorage.getItem('ROLE_VIEW');
      const isAdminRolePlannerView = roles.admin && (storageRole === 'planner' || roleView === 'planner');
      const isAdminRoleSupervisorView = roles.admin && (storageRole === 'supervisor' || roleView === 'supervisor');
      const isSupervisorLeadmanRole = roles?.supervisor || roles?.leadman;

      if (roles.planner || isAdminRolePlannerView) {
        await getQueuePositionsPlanner();
      }
      if (isSupervisorLeadmanRole || isAdminRoleSupervisorView) {
        await getQueuePositionsSupervisor();
      }

      const selectedLineId = localStorage.getItem('SELECTED_LINEJOBS');
      const findFirstLine = lines && sortBy(lines.data, 'name')[0].id;
      if (lines && lines.data && !selectedLineId) { this.onSelectHandle(findFirstLine); } else {
        this.onSelectHandle(selectedLineId);
      }
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}/signalsHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    const notificationsConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}/notificationsHub`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection.on('SignalCreated', response => {
      const signals = [{ id: response.id, lineId: response.lineId, ...response.signalData }];
      setOperatorSignals(signals);
    });
    connection.on('SignalsCleared', response => {
      const filteredSignals = alertSignals.filter(item => item.lineId !== response.lineId);
      setOperatorSignals(filteredSignals);
    });
    notificationsConnection.on('LineJobRevisionNotifications', response => {
      if (!JSON.parse(localStorage.getItem('USER_ROLE')).planner || roleView !== 'planner') {
        getLineJobRevisionNotifications(response.lineJobId);
      }
    });
    notificationsConnection.on('StationRevisionNotifications', response => {
      if (!JSON.parse(localStorage.getItem('USER_ROLE')).planner || roleView !== 'planner') {
        getSupervisorRevisionNotifications(response.lineJobStationId);
      }
      if (!JSON.parse(localStorage.getItem('USER_ROLE')).operator) {
        getOperatorRevisionNotifications(response.lineJobStationId);
      }
    });
    notificationsConnection.on('LineJobStationDeleted', response => {
      setLineJobStationDeletedNotification({
        workOrder: response.workOrder,
        stationId: response.stationId,
        action: response.action,
      });
    });
    connection.start();
    notificationsConnection.start();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onClearLocalStorage);
  }

  onViewChange = (icon) => {
    this.setState({ layoutViewType: icon });
    localStorage.setItem('LAYOUT_VIEW_TYPE', icon);
  }

  onClearLocalStorage = () => {
    localStorage.setItem('USER_ROLE', JSON.stringify({...initialRoles}));
  }

  onSelectHandle = async (val) => {
    this.setState({ selectedLineId: val });
    const { getLineJobsPlanner, getLineJobsSupervisor, roleView } = this.props;

    const roles = JSON.parse(localStorage.getItem('USER_ROLE'));
    const isSupervisorLeadmanRole = roles.supervisor || roles.leadman;

    if (roles.planner || (roles.admin && roleView === 'planner')) {
      getLineJobsPlanner(val);
    }
    if (isSupervisorLeadmanRole || (roles.admin && roleView === 'supervisor')) {
      getLineJobsSupervisor(val);
    }
    localStorage.setItem('SELECTED_LINEJOBS', val);
    // await getLineJobs(val);
  }

  handleChangeRole = (role) => {
    const { getLines, history } = this.props;
    initialRoles[role] = true;
    localStorage.setItem('USER_ROLE', JSON.stringify(initialRoles));
    this.setState({ userRole: initialRoles });
    history.push(NON_AUTH_ROLE_REDIRECT_URL[role]);
    window.location.reload();
    getLines();
  }

  closeMonitroViewWarningPopup = () => {
    this.setState({ openMonitorView: false });
  }

  getComponentByRole = (roles) => {
    const { roleView } = this.props;
    if (roles.admin) {
      switch (true) {
        case roleView === 'planner':
          return JobDetailsPlanner;
        case roleView === 'supervisor':
          return JobDetailsSupervisor;
        default:
          return null;
      }
    } else {
      switch (true) {
        case roles.planner:
          return JobDetailsPlanner;
        case roles.supervisor:
          return JobDetailsSupervisor;
        case roles.leadman:
          return JobDetailsSupervisor;
        default:
          return null;
      }
    }
  }

  render() {
    const {
      layoutViewType, userRole, viewMode, openMonitorView, selectedLineId,
    } = this.state;
    const {
      lines,
      queuePositions,
      lineJobs,
      isAuthenticated,
      history,
      isLoading,
      ...props
    } = this.props;
    const localStoreLineId = localStorage.getItem('SELECTED_LINEJOBS');
    const selectedLine = localStoreLineId === null ? selectedLineId : localStoreLineId;
    const storageValueLayoutViewType = localStorage.getItem('LAYOUT_VIEW_TYPE');
    const layoutView = storageValueLayoutViewType || layoutViewType;
    const isInnerPage = checkIsInnerPage(history.location.pathname);
    const parsedLines = lines.length ? lines.map(item => ({ value: item.id, text: item.name })) : [];
    const roles = JSON.parse(localStorage.getItem('USER_ROLE'));

    return (
      <Route
        {...props}
        render={() => (
          <div className="App">
            <MainLayout
              lines={sortBy(parsedLines, 'text')}
              onSelectHandle={(e) => this.onSelectHandle(e.target.value)}
              handleChangeRole={this.handleChangeRole}
              userRole={userRole}
              viewMode={viewMode}
              selectedValue={selectedLine}
              isInnerPage={isInnerPage}
              closeMonitroViewWarningPopup={this.closeMonitroViewWarningPopup}
              openMonitorView={openMonitorView}
              url={history.location.pathname}
            >
              <Switch>
                <div>
                  <AuthRoute
                    exact
                    path="/"
                    requiredRoles={['planner', 'supervisor', 'leadman', 'admin']}
                    isInitialPage
                    Component={MainComponent}
                    userRole={roles || initialRoles}
                    lineJobs={lineJobs}
                    onViewChange={this.onViewChange}
                    layoutView={layoutView}
                    queuePositions={queuePositions}
                    selectedLine={selectedLine}
                  />
                  <AuthRoute
                    exact
                    path="/job-details/:jobId"
                    requiredRoles={['planner', 'supervisor', 'leadman', 'admin']}
                    isInitialPage
                    Component={this.getComponentByRole(userRole)}
                    userRole={userRole}
                    selectedLine={selectedLine}
                  />
                  <AuthRoute
                    exact
                    path="/monitor"
                    requiredRoles={['supervisor', 'leadman', 'admin']}
                    Component={MonitorLayout}
                    selectedLine={selectedLine}
                    userRole={roles || initialRoles}
                  />
                  <Route
                    exact
                    path="/operator-login"
                    component={OperatorLogin}
                  />
                  <OperatorPrivateRoute exact path={['/operator', '/operator/:stationId']}>
                    <OperatorLayout />
                  </OperatorPrivateRoute>
                </div>
              </Switch>
            </MainLayout>
          </div>
        )}
      />
    );
  }
}

ProtectedRoute.propTypes = {
  lines: PropTypes.instanceOf(Object),
  queuePositions: PropTypes.instanceOf(Array),
  lineJobs: PropTypes.instanceOf(Array),
  isAuthenticated: PropTypes.bool,
  history: PropTypes.instanceOf(Object),
  isLoading: PropTypes.bool,
  getLineJobs: PropTypes.func,
  getLines: PropTypes.func,
};

const mapStateToProps = state => ({
  lines: state.lines.linesList,
  queuePositions: state.lines.queuePositions,
  lineJobs: state.lines.lineJobs,
  alertSignals: state.signals.operatorAlertSignals,
  roleView: state.changeViewStore.view,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getLines,
    getLineJobsPlanner,
    getLineJobsSupervisor,
    getQueuePositionsPlanner,
    getQueuePositionsSupervisor,
    setOperatorSignals,
    getLineJobRevisionNotifications,
    getOperatorRevisionNotifications,
    getSupervisorRevisionNotifications,
    setLineJobStationDeletedNotification,
    getUserAuthRoles,
    changeView,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ProtectedRoute));
