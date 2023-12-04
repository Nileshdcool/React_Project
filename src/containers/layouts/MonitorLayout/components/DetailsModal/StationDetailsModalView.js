import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BUTTONS_TEXT } from '../../../../../constants';
import ContainedButton from '../../../../../components/Buttons/ContainedButton';
import { TimeBoxesRow } from './components/TimeBoxesRow';
import { DetailsViewTitle } from './components/DetailsViewTitle';
import CustomIconButton from '../../../../../components/Buttons/CustomIconButton';
import { selectActiveLineJobsColorsMap } from '../../../../../selectors/monitorSelectors';
import {
  DetailsBodyWrapper,
  DetailsHeader,
  DetailsWrapper,
  StationDetailsActionsBlock,
} from './styledComponents';
import {
  getOpenedStationTasks,
} from '../../../../../actions/monitorActions';
import TasksBlock from './components/TasksBlock';

const DetailsModalView = ({
  open,
  onClose,
  lineJobId,
  lineJobsColorsMap,
  stationData,
  getOpenedStationTasks,
  stationsSignals,
  colorType,
  isWarning
}) => {
  useEffect(() => {
    if (open) {
      getOpenedStationTasks(stationData.id);
    }
  }, [getOpenedStationTasks, open, stationData]);

  return (
    <DetailsWrapper
      open={open}
      onClose={onClose}
      PaperComponent={Paper}
    >
      <DetailsHeader
        bgcolor={lineJobsColorsMap[lineJobId]}
      >
        <CustomIconButton
          disableRipple
          onClick={onClose}
          icon={<CloseIcon />}
          iconFontSize="26px"
        />
      </DetailsHeader>
      <DetailsBodyWrapper>
        <DetailsViewTitle
          isWarning={isWarning}
          colorType={colorType}
          stationsSignals={stationsSignals}
          stationData={stationData} />
        <TimeBoxesRow stationData={stationData} />
        <Typography variant="subtitle1">
          OPERATOR
          <span className={'operator-name'}>{stationData.operator}</span>
        </Typography>
        <StationDetailsActionsBlock>
          <ContainedButton
            variant="contained"
            color="primary"
            colorType="classic"
            text={BUTTONS_TEXT.edit}
            component={Link}
            to={{
              pathname: `/job-details/${lineJobId}`,
              state: {
                stationName: stationData.name,
                stationId: stationData.id,
              },
            }}
          />
        </StationDetailsActionsBlock>
        <TasksBlock />
      </DetailsBodyWrapper>
    </DetailsWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  lineJobsColorsMap: selectActiveLineJobsColorsMap(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOpenedStationTasks,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailsModalView);
