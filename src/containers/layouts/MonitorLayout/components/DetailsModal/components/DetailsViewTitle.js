import { DetailsViewTitleIconWrapper, DetailsViewTitleWrapper, TitleUnitBlock } from '../../styledComponents';

import { DetailsTitle } from '../styledComponents';
import React from 'react';
import { StationWarningOctagonIcon } from "../../../../../../components/SvgIcons/svgIcons";
import Typography from '@material-ui/core/Typography';
import { SignalsWarningIcon } from '../../../../../../components/SvgIcons/svgIcons';

export const DetailsViewTitle = React.memo(({ stationData, colorType, stationsSignals, isWarning }) => (
  <DetailsTitle isGrayedOut={!stationData.unitNumber && !!stationData.operator}>
    <DetailsViewTitleWrapper>
      <Typography variant="subtitle1">
        {stationData.name}
      </Typography>
      <DetailsViewTitleIconWrapper>
        {isWarning ? <SignalsWarningIcon width="19" height="19" color="ORANGE" /> : null}
      </DetailsViewTitleIconWrapper>
      <DetailsViewTitleIconWrapper>
        {stationsSignals && stationsSignals[stationData.id] &&
          <StationWarningOctagonIcon colorType={colorType} />
        }
      </DetailsViewTitleIconWrapper>
    </DetailsViewTitleWrapper>
    {!!stationData.unitNumber && (
      <TitleUnitBlock>
        <Typography variant="body1">
          unit
        </Typography>
        <Typography variant="h1">
          {stationData.unitNumber}
        </Typography>
      </TitleUnitBlock>
    )}
  </DetailsTitle>
));
