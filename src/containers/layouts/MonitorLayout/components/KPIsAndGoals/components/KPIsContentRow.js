import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  KPIsAndGoalsContentRow,
  TimeBox,
  TimeBoxesWrapper,
  TimeBoxTitle,
  TimeBoxValue,
} from '../../styledComponents';

export const KPIsContentRow = ({ item, titles, bgcolor }) => (
  <KPIsAndGoalsContentRow>
    <Typography variant="h5">
      <span>WO#: </span>
      {item.workOrder.number}
    </Typography>
    <TimeBoxesWrapper>
      <TimeBox>
        <TimeBoxTitle bgcolor={bgcolor}>
          <Typography variant="h5">{titles.firstBoxTitle}</Typography>
        </TimeBoxTitle>
        <TimeBoxValue>
          <Typography variant="subtitle1">{item.planned}</Typography>
        </TimeBoxValue>
      </TimeBox>
      <TimeBox>
        <TimeBoxTitle bgcolor={bgcolor}>
          <Typography variant="h5">{titles.secondBoxTitle}</Typography>
        </TimeBoxTitle>
        <TimeBoxValue>
          <Typography variant="subtitle1">{item.actual}</Typography>
        </TimeBoxValue>
      </TimeBox>
    </TimeBoxesWrapper>
  </KPIsAndGoalsContentRow>
);
