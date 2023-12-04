import {
  StationTileContent,
  StationTileTitle,
  StationTileTitleLeftBlock,
  TitleUnitBlock,
} from '../styledComponents';

import DetailsModalView from '../DetailsModal/StationDetailsModalView';
import { LABEL_COLORS } from '../../../../../constants';
import React from 'react';
import { SignalsWarningIcon } from '../../../../../components/SvgIcons/svgIcons';
import { StationMonitorTileWrapper } from '../../styledComponents';
import StationTileContentRow from './components/StationTileContentRow';
import { StationWarningOctagonIcon } from "../../../../../components/SvgIcons/svgIcons";
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import {
  clearOpenedStationTasks,
} from '../../../../../actions/monitorActions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectActiveLineJobsColorsMap,
} from '../../../../../selectors/monitorSelectors';

const checkColorType = (signals) => {
  if (signals && signals.some(item => item.urgency === 'Now')) {
    return 'NOW'
  } else {
    return 'SOON'
  }
}

const StationTile = ({
  station, lineJobsColorsMap, lineJobId, clearOpenedStationTasks, stationsSignals, notifications
}) => {
  const [openedStationData, setOpenedStationData] = React.useState(false);

  const openStationDetails = () => {
    setOpenedStationData(true);
  };
  const onCloseModal = () => {
    setOpenedStationData(false);
    clearOpenedStationTasks();
  };

  return (
    <StationMonitorTileWrapper
      isStationTile
      borderColor={lineJobsColorsMap[lineJobId]}
    >
      <StationTileTitle>
        <StationTileTitleLeftBlock>
          <Typography variant="subtitle1">
            {station.name}
          </Typography>
          {!!stationsSignals && stationsSignals[station.id] &&
            <StationWarningOctagonIcon colorType={checkColorType(stationsSignals[station.id])} />
          }
          {notifications.filter(item => item.lineJobStationId === station.id).length
            ? <SignalsWarningIcon width="19" height="19" color="ORANGE" />
            : null
          }
        </StationTileTitleLeftBlock>
        <TitleUnitBlock>
          <Typography variant="body1">
            unit
          </Typography>
          {!!station.unitNumber && (
            <Typography variant="h1">
              {station.unitNumber}
            </Typography>
          )}
        </TitleUnitBlock>
      </StationTileTitle>
      <StationTileContent>
        <StationTileContentRow
          item={station}
          lineJobId={lineJobId}
          bgcolor={LABEL_COLORS.green}
          openStationDetails={openStationDetails}
        />
      </StationTileContent>
      <DetailsModalView
        stationData={station}
        lineJobId={lineJobId}
        open={openedStationData}
        onClose={onCloseModal}
        stationsSignals={stationsSignals}
        isWarning={notifications.filter(item => item.lineJobStationId === station.id).length}
        colorType={checkColorType(stationsSignals && stationsSignals[station.id])}
      />
    </StationMonitorTileWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  lineJobsColorsMap: selectActiveLineJobsColorsMap(),
});
const mapDispatchToProps = dispatch => bindActionCreators({
  clearOpenedStationTasks,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StationTile);
