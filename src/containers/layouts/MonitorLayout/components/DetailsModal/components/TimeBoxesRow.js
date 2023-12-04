import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  TimeBoxesWrapper,
} from '../../styledComponents';
import { LABEL_COLORS, MONITOR_AVERAGES_COLORS } from '../../../../../../constants';
import {
  StationDetailsModalTimeBox,
  StationDetailsTimeBoxTitle,
  StationDetailsTimeBoxValue,
} from '../styledComponents';

import { MONITOR_TILE_BOXES_TITLES } from '../../../../../../constants/labelsNaming';
import { checkTitleBackgroundColorKey } from '../../../../../../utils/monitorViewFunctions';

export const TimeBoxesRow = React.memo(({ stationData }) => (
  <TimeBoxesWrapper>
    <StationDetailsModalTimeBox>
      <StationDetailsTimeBoxTitle bgcolor={LABEL_COLORS.green}>
        <Typography variant="subtitle2">{MONITOR_TILE_BOXES_TITLES.planned}</Typography>
      </StationDetailsTimeBoxTitle>
      <StationDetailsTimeBoxValue isGrayedOut={!stationData.unitNumber && !!stationData.operator}>
        <Typography variant="h2">{stationData.planned}</Typography>
      </StationDetailsTimeBoxValue>
    </StationDetailsModalTimeBox>
    <StationDetailsModalTimeBox>
      <StationDetailsTimeBoxTitle
        isWhiteHeader={!stationData.average}
        bgcolor={
        MONITOR_AVERAGES_COLORS[checkTitleBackgroundColorKey(stationData.planned, stationData.average)]
      }
      >
        <Typography variant="subtitle2">{MONITOR_TILE_BOXES_TITLES.average}</Typography>
      </StationDetailsTimeBoxTitle>
      <StationDetailsTimeBoxValue
        isGrayedOut={!stationData.unitNumber && !!stationData.operator}
      >
        <Typography variant="h2">{stationData.average}</Typography>
      </StationDetailsTimeBoxValue>
    </StationDetailsModalTimeBox>
    <StationDetailsModalTimeBox>
      <StationDetailsTimeBoxTitle
        isWhiteHeader={!stationData.average}
        bgcolor={
        MONITOR_AVERAGES_COLORS[checkTitleBackgroundColorKey(stationData.planned, stationData.average)]
      }
      >
        <Typography variant="subtitle2">{MONITOR_TILE_BOXES_TITLES.last}</Typography>
      </StationDetailsTimeBoxTitle>
      <StationDetailsTimeBoxValue
        isGrayedOut={!stationData.unitNumber && !!stationData.operator}
      >
        <Typography variant="h2">{stationData.last}</Typography>
      </StationDetailsTimeBoxValue>
    </StationDetailsModalTimeBox>
  </TimeBoxesWrapper>
));
