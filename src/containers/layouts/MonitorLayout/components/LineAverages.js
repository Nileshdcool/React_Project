import React from 'react';
import Typography from '@material-ui/core/Typography';

import { LABEL_COLORS, MONITOR_AVERAGES_COLORS } from '../../../../constants';
import { MONITOR_TILE_BOXES_TITLES, MONITOR_TILE_TITLES } from '../../../../constants/labelsNaming';

import { MonitorTileWrapper } from '../styledComponents';
import {
  KPIsAndGoalsContent,
  KPIsAndGoalsTitle,
  LineAveragesTimeBoxesWrapper,
  LineAveragesTimeBoxTitle,
  LineAveragesTimeBoxValue,
  TimeBox,
} from './styledComponents';

export const LineAveragesTile = React.memo(({ data, bgColor }) => (
  <MonitorTileWrapper contentHeightBlock>
    <KPIsAndGoalsTitle>
      <Typography variant="subtitle1">
        {MONITOR_TILE_TITLES.averagesTile}
      </Typography>
    </KPIsAndGoalsTitle>
    <KPIsAndGoalsContent>
      <LineAveragesTimeBoxesWrapper>
        <TimeBox>
          <LineAveragesTimeBoxTitle bgcolor={LABEL_COLORS.green}>
            <Typography variant="h5">{MONITOR_TILE_BOXES_TITLES.planned}</Typography>
          </LineAveragesTimeBoxTitle>
          <LineAveragesTimeBoxValue>
            <Typography variant="h2">{!!data.planned && data.planned}</Typography>
          </LineAveragesTimeBoxValue>
        </TimeBox>
        <TimeBox>
          <LineAveragesTimeBoxTitle
            bgcolor={MONITOR_AVERAGES_COLORS[bgColor]}
            isWhiteHeader={!data.actual}
          >
            <Typography variant="h5">{MONITOR_TILE_BOXES_TITLES.actual}</Typography>
          </LineAveragesTimeBoxTitle>
          <LineAveragesTimeBoxValue>
            <Typography variant="h2">{!!data.actual && data.actual}</Typography>
          </LineAveragesTimeBoxValue>
        </TimeBox>
      </LineAveragesTimeBoxesWrapper>
    </KPIsAndGoalsContent>
  </MonitorTileWrapper>
));
