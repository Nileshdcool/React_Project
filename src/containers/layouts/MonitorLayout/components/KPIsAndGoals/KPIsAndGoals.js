import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { MonitorTileWrapper } from '../../styledComponents';
import {
  KPIsAndGoalsContent,
  KPIsAndGoalsTitle,
} from '../styledComponents';
import { KPIsContentRow } from './components/KPIsContentRow';
import { GoalsContentRow } from './components/GoalsContentRow';
import { LABEL_COLORS } from '../../../../../constants';
import { selectActiveLineJobsColorsMap } from '../../../../../selectors/monitorSelectors';

export const KPIsAndGoals = ({
  data, isWorkOrderBox, titles, lineJobsColorsMap, setUnitsPlanned,
}) => (
  <MonitorTileWrapper contentHeightBlock>
    <KPIsAndGoalsTitle>
      <Typography variant="subtitle1">
        {titles.title}
      </Typography>
    </KPIsAndGoalsTitle>
    <KPIsAndGoalsContent>
      {isWorkOrderBox
        ? (data.map((item, index) => (
          <KPIsContentRow
            key={item.lineJobId}
            item={item}
            titles={titles}
            bgcolor={index > 3
              ? LABEL_COLORS.closeIconErrorAlert
              : lineJobsColorsMap[item.lineJobId]}
          />
        )))
        : data.map((item) => (
          <GoalsContentRow
            key={item.id}
            item={item}
            titles={titles}
            setUnitsPlanned={setUnitsPlanned}
          />
        )) 
      }
    </KPIsAndGoalsContent>
  </MonitorTileWrapper>
);


const mapStateToProps = createStructuredSelector({
  lineJobsColorsMap: selectActiveLineJobsColorsMap(),
});

export default connect(
  mapStateToProps,
)(KPIsAndGoals);
