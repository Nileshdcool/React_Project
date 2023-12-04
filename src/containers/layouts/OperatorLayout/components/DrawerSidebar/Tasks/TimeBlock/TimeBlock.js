import React from 'react';

import { checkTitleBackgroundColorKey } from '../../../../../../../utils/monitorViewFunctions';

import { LABEL_COLORS, MONITOR_AVERAGES_COLORS } from '../../../../../../../constants';
import { TASKS_TIME_BLOCKS } from '../../../../../../../constants/labelsNaming';

import {
  KPIsAndGoalsContent,
  LineAveragesTimeBoxTitle,
  LineAveragesTimeBoxValue,
  LineAveragesTimeBoxesWrapper,
  MonitorTileWrapper,
  TimeBlockMinutes,
  TimeBlockNumber,
  TimeBlockTitle,
  TimeBox,
} from './styledComponents';

export const TimeBlock = React.memo(({ kpi }) => (
  <MonitorTileWrapper contentHeightBlock>
    <KPIsAndGoalsContent>
      <LineAveragesTimeBoxesWrapper>
        <TimeBox>
          <LineAveragesTimeBoxTitle bgcolor={kpi.planned ? LABEL_COLORS.green : LABEL_COLORS.secondary}>
            <TimeBlockTitle titleColor={kpi.planned ? LABEL_COLORS.secondary : LABEL_COLORS.mainCardTitleColor} variant="h5">
              {TASKS_TIME_BLOCKS.planned}
            </TimeBlockTitle>
          </LineAveragesTimeBoxTitle>
          {kpi.planned ? <LineAveragesTimeBoxValue>
            <TimeBlockNumber variant="h2">{kpi.planned}</TimeBlockNumber>
            <TimeBlockMinutes variant="h5">MINUTES</TimeBlockMinutes>
          </LineAveragesTimeBoxValue> : <LineAveragesTimeBoxValue />}
        </TimeBox>
        <TimeBox>
          <LineAveragesTimeBoxTitle
            bgcolor={
              kpi.average ?
                MONITOR_AVERAGES_COLORS[checkTitleBackgroundColorKey(kpi.planned, kpi.average)]
                : LABEL_COLORS.secondary
            }
          >
            <TimeBlockTitle titleColor={kpi.average ? LABEL_COLORS.secondary : LABEL_COLORS.mainCardTitleColor} variant="h5">
              {TASKS_TIME_BLOCKS.average}
            </TimeBlockTitle>
          </LineAveragesTimeBoxTitle>
          {kpi.average ?
            <LineAveragesTimeBoxValue>
              <TimeBlockNumber variant="h2">{kpi.average}</TimeBlockNumber>
              <TimeBlockMinutes variant="h5">MINUTES</TimeBlockMinutes>
            </LineAveragesTimeBoxValue>
            : <LineAveragesTimeBoxValue />}
        </TimeBox>
        <TimeBox>
          <LineAveragesTimeBoxTitle
            bgcolor={
              kpi.last ?
                MONITOR_AVERAGES_COLORS[checkTitleBackgroundColorKey(kpi.planned, kpi.last)]
                : LABEL_COLORS.secondary
            }
          >
            <TimeBlockTitle titleColor={kpi.last ? LABEL_COLORS.secondary : LABEL_COLORS.mainCardTitleColor} variant="h5">
              {TASKS_TIME_BLOCKS.lastUnit}
            </TimeBlockTitle>
          </LineAveragesTimeBoxTitle>
          {kpi.last ?
            <LineAveragesTimeBoxValue>
              <TimeBlockNumber variant="h2">{kpi.last}</TimeBlockNumber>
              <TimeBlockMinutes variant="h5">MINUTES</TimeBlockMinutes>
            </LineAveragesTimeBoxValue>
            : <LineAveragesTimeBoxValue />}
        </TimeBox>
      </LineAveragesTimeBoxesWrapper>
    </KPIsAndGoalsContent>
  </MonitorTileWrapper>
));
