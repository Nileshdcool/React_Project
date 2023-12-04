import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import ContainedButton from '../../../../../../components/Buttons/ContainedButton';

import { checkTitleBackgroundColorKey } from '../../../../../../utils/monitorViewFunctions';

import { BUTTONS_TEXT, MONITOR_AVERAGES_COLORS } from '../../../../../../constants';
import { MONITOR_TILE_BOXES_TITLES } from '../../../../../../constants/labelsNaming';

import {
  ActionsBlock,
  StationTileContentRowWrapper,
  StationTimeBox,
  StationTimeBoxTitle, StationTimeBoxValue,
  TimeBoxesWrapper,
} from '../../styledComponents';

const StationTileContentRow = React.memo(({
  item,
  bgcolor,
  lineJobId,
  openStationDetails,
}) => (
  <StationTileContentRowWrapper>
    <TimeBoxesWrapper>
      <StationTimeBox>
        <StationTimeBoxTitle bgcolor={bgcolor}>
          <Typography variant="h5">{MONITOR_TILE_BOXES_TITLES.planned}</Typography>
        </StationTimeBoxTitle>
        <StationTimeBoxValue>
          <Typography variant="h2">{!!item.planned && item.planned}</Typography>
        </StationTimeBoxValue>
      </StationTimeBox>
      <StationTimeBox>
        <StationTimeBoxTitle
          isWhiteHeader={!item.average}
          bgcolor={
            MONITOR_AVERAGES_COLORS[checkTitleBackgroundColorKey(item.planned, item.average)]
          }
        >
          <Typography variant="h5">{MONITOR_TILE_BOXES_TITLES.average}</Typography>
        </StationTimeBoxTitle>
        <StationTimeBoxValue>
          <Typography variant="h2">{!!item.average && item.average}</Typography>
        </StationTimeBoxValue>
      </StationTimeBox>
      <StationTimeBox>
        <StationTimeBoxTitle
          isWhiteHeader={!item.last}
          bgcolor={
            MONITOR_AVERAGES_COLORS[checkTitleBackgroundColorKey(item.planned, item.last)]
          }
        >
          <Typography variant="h5">{MONITOR_TILE_BOXES_TITLES.last}</Typography>
        </StationTimeBoxTitle>
        <StationTimeBoxValue>
          <Typography variant="h2">{!!item.last && item.last}</Typography>
        </StationTimeBoxValue>
      </StationTimeBox>
    </TimeBoxesWrapper>
    <Typography variant="subtitle1">
      OPERATOR
      <span>{item.operator}</span>
    </Typography>
    <ActionsBlock>
      <Typography variant="subtitle1" onClick={openStationDetails}>
        {BUTTONS_TEXT.details}
      </Typography>
      <ContainedButton
        variant="contained"
        color="primary"
        colorType="classic"
        text={BUTTONS_TEXT.edit}
        component={Link}
        to={{
          pathname: `/job-details/${lineJobId}`,
          state: {
            stationName: item.name,
            stationId: item.id,
          },
        }}
      />
    </ActionsBlock>
  </StationTileContentRowWrapper>
));

export default withRouter(StationTileContentRow);
