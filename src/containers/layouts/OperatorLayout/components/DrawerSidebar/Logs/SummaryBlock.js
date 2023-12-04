import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  ContentBlock,
  SummaryBlockWrapper,
  SummaryContentRow,
  SummaryValue,
} from '../styledComponents';

export const SummaryBlock = ({sideBarData, drawingName}) => (
  <SummaryBlockWrapper>
    <SummaryContentRow>
      <ContentBlock>
        <Typography variant="subtitle1">
          SO#:
        </Typography>
        <SummaryValue
          variant="subtitle1"
        >
          {!!sideBarData && !!sideBarData.salesOrder && sideBarData.salesOrder.number}
        </SummaryValue>
      </ContentBlock>
      <ContentBlock>
        <Typography variant="subtitle1">
          WO#:
        </Typography>
        <SummaryValue
          variant="subtitle1"
        >
          {!!sideBarData && sideBarData.workOrder.number}
        </SummaryValue>
      </ContentBlock>
    </SummaryContentRow>
    <SummaryContentRow>
      <ContentBlock>
        <Typography variant="subtitle1">
          DRAWING:
        </Typography>
        <SummaryValue
          variant="subtitle1"
        >
          {drawingName}
        </SummaryValue>
      </ContentBlock>
    </SummaryContentRow>
  </SummaryBlockWrapper>
);
