import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  clearMonitorNotificationsData,
  getStationRevisedElementTypes,
  getSupervisorRevisionNotifications,
  viewNotificationsModalAsSupervisor,
} from '../../../actions/issueRevision';
import {
  getActiveLineJobs,
  getActiveLineJobsStations,
  getLineAverages,
  getLineMonthlyShiftGoals,
  getLineWorkOrderHours,
  getMonitorStationsSignals,
  markSignalAsViewed,
  updateOperatorSignals,
  updateUnitsPlanned,
} from '../../../actions/monitorActions';
import Loader from '../../../components/Loader/Loader';
import IssueRevisionInfo from '../../../components/ModalDialog/IssueRevision/IssueRevisionInfo';
import { MONITOR_TILE_BOXES_TITLES, MONITOR_TILE_TITLES } from '../../../constants/labelsNaming';
import {
  selectMonitorModalNotifications,
  selectMonitorNotifications,
} from '../../../selectors/issueRevision';
import {
  selectActiveLineJobs,
  selectActiveLineJobsStations,
  selectLineAverages,
  selectLineMonthlyShiftGoals,
  selectLineWorkOrderHours,
  selectMonitorStationsAlertSignals,
  selectMonitorStationsSignals,
} from '../../../selectors/monitorSelectors';
import { checkTitleBackgroundColorKey } from '../../../utils/monitorViewFunctions';
import SignalsModal from '../JobDetails/SupervisorView/components/SignalsModal/SignalsModal';
import ActiveJobTile from './components/JobTile';
import KPIsAndGoals from './components/KPIsAndGoals/KPIsAndGoals';
import { LineAveragesTile } from './components/LineAverages';
import StationTile from './components/StationTile/StationTile';
import {
  ActiveLineJobsWrapper,
  KPIsAndGoalsWrapper,
  LineJobsDataWrapper,
  LineJobsStationsDataWrapper,
  MonitorViewWrapper,
} from './styledComponents';

export const BASE_URL = process.env.REACT_APP_BASE_URL; // TODO Why this row stay here?

const MonitorLayout = ({
  selectedLine,
  getActiveLineJobs,
  activeLineJobs,
  getLineWorkOrderHours,
  getLineMonthlyShiftGoals,
  updateUnitsPlanned,
  lineWorkOrderHours,
  lineMonthlyShiftGoals,
  getLineAverages,
  lineAverages,
  getActiveLineJobsStations,
  activeLineJobsStations,
  getMonitorStationsSignals,
  alertSignals,
  monitorSignals,
  markSignalAsViewed,
  updateOperatorSignals,
  getStationRevisedElementTypes,
  getSupervisorRevisionNotifications,
  viewNotificationsModalAsSupervisor,
  modalNotifications,
  notifications,
  clearMonitorNotificationsData,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [stationsSignals, setStationsSignals] = React.useState(null);
  const [modalSignal, setModalSignal] = React.useState(null);

  const parseMonitorSignals = (signals) => signals.reduce((result, item) => {
    const { lineJobStationId, signalType, urgency } = item;
    const destructuredSignalProps = { signalType: signalType.name, urgency: urgency.description };
    result[lineJobStationId] = result[lineJobStationId]
      ? [...result[lineJobStationId], destructuredSignalProps]
      : [destructuredSignalProps];
    return result;
  }, {});

  const getMonitorData = () => {
    setIsLoading(true);
    Promise.all([
      getActiveLineJobs(selectedLine),
      getLineWorkOrderHours(selectedLine),
      getLineMonthlyShiftGoals(selectedLine),
      getLineAverages(selectedLine),
      getActiveLineJobsStations(selectedLine).then(response => {
        if (response?.data) {
          response.data.forEach(item => {
            item.lineJobStations.forEach(station => getSupervisorRevisionNotifications(station.id));
          });
        }
      }),
      getStationRevisedElementTypes(),
      getMonitorStationsSignals(selectedLine).then(response => {
        if(response?.data) {
          const signals = parseMonitorSignals(response?.data);
          setStationsSignals(signals);
        }
      }),
    ]).then(() => setIsLoading(false));
  };

  useEffect(() => {
    getMonitorData();
    setInterval(() => {
      getMonitorData();
    }, 30000);
  }, [
    getActiveLineJobs,
    getActiveLineJobsStations,
    getLineAverages,
    getLineWorkOrderHours,
    getLineMonthlyShiftGoals,
    selectedLine,
    getMonitorStationsSignals,
    getStationRevisedElementTypes,
    getSupervisorRevisionNotifications,
]);

  const setUnitsPlanned = async (id, planned) => {
    await updateUnitsPlanned(id, selectedLine, planned);
    getLineMonthlyShiftGoals(selectedLine);
  };

  useEffect(() => {
    const signals = parseMonitorSignals(monitorSignals);
    setStationsSignals(signals);
  }, [monitorSignals]);

  useEffect(() => {
    setModalSignal(alertSignals[0]);
  }, [alertSignals]);

  const confirmSignalBySupervisor = (id) => {
    const filteredAlertSignals = alertSignals.filter(item => item.id !== id);
    setModalSignal(null);
    markSignalAsViewed(id);
    updateOperatorSignals(filteredAlertSignals);
  };

  const confirmModalBySupervisor = async (items) => {
    const viewedItemsIDs = items.map(item => item.id);
    await viewNotificationsModalAsSupervisor(viewedItemsIDs).then(() => clearMonitorNotificationsData())
      .then(() => {
        getActiveLineJobsStations(selectedLine).then(response => {
          if(response.data) {
            response.data.forEach(item => {
              item.lineJobStations.forEach(station => getSupervisorRevisionNotifications(station.id));
            });
          }
        });
      });
  };

  const getLineJobBySO = (salesOrderID) => {
    const lineJob = activeLineJobs.find((lineJob) => lineJob.salesOrder.id === salesOrderID) || null;
    return lineJob ? lineJob.workOrder.number : '';
  };

  const allStations = activeLineJobsStations.map((item) => item.lineJobStations.map((stationData) => ({
    ...stationData,
    lineJobId: item.lineJobId,
  }))).flat();
  const uniqStations = allStations ? allStations.reverse().filter((stationItem, index) => {
    const findIndex = allStations.findIndex((allStationItem) => allStationItem.stationId === stationItem.stationId);
    return findIndex === index;
  }) : [];
  const uniqStationsSorted = uniqStations && uniqStations.sort((a, b) => (a.sortIndex > b.sortIndex ? 1 : -1));

  const uniqStationsSortedIDs = uniqStationsSorted.map(item => item.id);

  const filteredNotificationsForStation = modalNotifications.filter(notification =>
    notification.filter(item => uniqStationsSortedIDs.includes(item.lineJobStationId)).length > 0);

  return (
    <MonitorViewWrapper>
      {!!activeLineJobs.length && (
        <LineJobsDataWrapper>
          <ActiveLineJobsWrapper>
            {activeLineJobs.map((data) => (
              <ActiveJobTile
                key={data.id}
                jobData={data}
              />
            ))}
          </ActiveLineJobsWrapper>
          <KPIsAndGoalsWrapper>
            <KPIsAndGoals
              data={lineWorkOrderHours}
              isWorkOrderBox
              titles={{
                title: MONITOR_TILE_TITLES.workOrderTile,
                firstBoxTitle: MONITOR_TILE_BOXES_TITLES.planned,
                secondBoxTitle: MONITOR_TILE_BOXES_TITLES.actual,
              }}
            />
            <KPIsAndGoals
              data={lineMonthlyShiftGoals}
              setUnitsPlanned={setUnitsPlanned}
              titles={{
                title: MONITOR_TILE_TITLES.shiftGoalsTile,
                firstBoxTitle: MONITOR_TILE_BOXES_TITLES.unitsPlanned,
                secondBoxTitle: MONITOR_TILE_BOXES_TITLES.unitsShipped,
              }}
            />
          </KPIsAndGoalsWrapper>
          <LineAveragesTile
            data={lineAverages}
            bgColor={checkTitleBackgroundColorKey(lineAverages.planned, lineAverages.actual)}
          />
        </LineJobsDataWrapper>
      )}
      <LineJobsStationsDataWrapper>
        {uniqStationsSorted.map((item) => (
          <StationTile
            lineJobId={item.lineJobId}
            key={item.id}
            station={item}
            stationsSignals={stationsSignals}
            notifications={notifications}
          />
        ))}
      </LineJobsStationsDataWrapper>
      {!isLoading && !activeLineJobs.length && <Typography variant="h4">No active Jobs</Typography>}
      <Loader open={isLoading} />
      <SignalsModal
        open={!!modalSignal}
        signalModalData={modalSignal}
        onClickConfirm={() => confirmSignalBySupervisor(modalSignal.id)}
      />
      {filteredNotificationsForStation && filteredNotificationsForStation.length > 0 && (
        <IssueRevisionInfo
          open
          modalNotification={filteredNotificationsForStation[0]}
          onClickConfirm={() => confirmModalBySupervisor(filteredNotificationsForStation[0])}
          // workOrder={getLineJobBySO(filteredNotificationsForStation[0][0].salesOrderId)}
        />
      )}
    </MonitorViewWrapper>
  );
};

MonitorLayout.propTypes = {
  activeLineJobs: PropTypes.instanceOf(Array),
};

const mapStateToProps = createStructuredSelector({
  activeLineJobs: selectActiveLineJobs(),
  lineWorkOrderHours: selectLineWorkOrderHours(),
  lineMonthlyShiftGoals: selectLineMonthlyShiftGoals(),
  lineAverages: selectLineAverages(),
  activeLineJobsStations: selectActiveLineJobsStations(),
  alertSignals: selectMonitorStationsAlertSignals(),
  monitorSignals: selectMonitorStationsSignals(),
  notifications: selectMonitorNotifications(),
  modalNotifications: selectMonitorModalNotifications(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getActiveLineJobs,
  getLineWorkOrderHours,
  getLineMonthlyShiftGoals,
  updateUnitsPlanned,
  getLineAverages,
  getActiveLineJobsStations,
  getMonitorStationsSignals,
  markSignalAsViewed,
  updateOperatorSignals,
  getStationRevisedElementTypes,
  viewNotificationsModalAsSupervisor,
  getSupervisorRevisionNotifications,
  clearMonitorNotificationsData,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonitorLayout);
