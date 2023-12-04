import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { MonitorTileWrapper } from '../styledComponents';
import {
  ActiveJobTileContent, ActiveJobTileContentRow, ActiveJobTileTitle, StyledValue,
} from './styledComponents';
import {
  selectActiveLineJobsColorsMap,
} from '../../../../selectors/monitorSelectors';

const ActiveJobTile = ({ jobData, lineJobsColorsMap }) => (
  <MonitorTileWrapper>
    <ActiveJobTileTitle bgcolor={lineJobsColorsMap[jobData.id]}>
      <Typography variant="subtitle2">
        {`SO#: ${!!jobData.salesOrder && jobData.salesOrder.number}`}
      </Typography>
    </ActiveJobTileTitle>
    <ActiveJobTileContent>
      <ActiveJobTileContentRow>
        <Typography
          variant="subtitle1"
        >
          CUSTOMER:
        </Typography>
        <StyledValue>
          {jobData.customer.name}
        </StyledValue>
      </ActiveJobTileContentRow>
      <ActiveJobTileContentRow>
        <Typography
          variant="subtitle1"
        >
          WO#:
        </Typography>
        <StyledValue>
          {jobData.workOrder.number}
        </StyledValue>
      </ActiveJobTileContentRow>
      <ActiveJobTileContentRow>
        <Typography
          variant="subtitle1"
        >
          DESCRIPT:
        </Typography>
        <StyledValue>
          {jobData.description}
        </StyledValue>
      </ActiveJobTileContentRow>
      <ActiveJobTileContentRow>
        <Typography
          variant="subtitle1"
        >
          REVISION#:
        </Typography>
        <StyledValue>
          {jobData.revisions}
        </StyledValue>
      </ActiveJobTileContentRow>
    </ActiveJobTileContent>
  </MonitorTileWrapper>
);

const mapStateToProps = createStructuredSelector({
  lineJobsColorsMap: selectActiveLineJobsColorsMap(),
});

export default connect(
  mapStateToProps,
)(ActiveJobTile);
