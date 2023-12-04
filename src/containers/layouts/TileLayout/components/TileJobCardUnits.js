import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import * as PropTypes from 'prop-types';
import {
  ContentUnitBlock, ContentBlocksWrapper, TileJobCardUnitWrapper, StyledDivider,
} from '../styledComponents';

export const TileJobCardUnits = React.memo(({ units }) => (
  <TileJobCardUnitWrapper elevation={0}>
    <CardHeader
      title={(<Typography variant="h6">UNITS</Typography>)}
    />
    <CardContent>
      <ContentBlocksWrapper>
        <ContentUnitBlock>
          <Typography
            variant="h4"
          >
            {units.scheduled}
          </Typography>
          <Typography
            variant="h5"
          >
            Scheduled
          </Typography>
        </ContentUnitBlock>
        <StyledDivider flexItem />
        <ContentUnitBlock>
          <Typography
            variant="h4"
          >
            {units.completed}
          </Typography>
          <Typography
            variant="h5"
          >
            Completed
          </Typography>
        </ContentUnitBlock>
      </ContentBlocksWrapper>
    </CardContent>
  </TileJobCardUnitWrapper>
));


TileJobCardUnits.propTypes = {
  units: PropTypes.instanceOf(Object).isRequired,
};
