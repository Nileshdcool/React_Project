import React from 'react';
import {
  ActiveLineJobsWrapper,
  CountsTitle,
  TaskTitle,
  TimeSection,
  TitleSection,
  UnitsCounterWrapper,
  UnitTitle,
} from '../Tasks/styledComponents';

import { SummaryBlock } from '../Tasks/SummaryBlock';
import { TimeBlock } from '../Tasks/TimeBlock/TimeBlock';
import { StationUnitsInformation } from '../styledComponents';

export const StationUnitsInformationBlock = ({ sideBarData, kpi, choosedTab }) => (
  <StationUnitsInformation>
    <TitleSection>
      <TaskTitle variant="h4">
        {choosedTab.toUpperCase()}
      </TaskTitle>
      <UnitsCounterWrapper>
        <UnitTitle variant="h4">UNIT:</UnitTitle>
        <CountsTitle variant="h4">
          {sideBarData && `${sideBarData.currentUnit} of ${sideBarData.totalUnits}`}
        </CountsTitle>
      </UnitsCounterWrapper>
    </TitleSection>
    <SummaryBlock
      sideBarData={sideBarData}
    />
    <TimeSection>
      <TimeBlock kpi={kpi} />
    </TimeSection>
  </StationUnitsInformation>
);
