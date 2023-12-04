import {
  LogsWrapper,
  TaskTitle,
  TasksPanelWrapper,
  TitleSection,
} from './styledComponents';
import React, { useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { selectLoadingLogs, selectOperatorLogs } from '../../../../../../selectors/operatorSelectors';

import ListComponent from '../../../../../../components/ListComponent/ListComponent';
import { LogsList } from './List';
import { SummaryBlock } from './SummaryBlock';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getOperatorLogs } from '../../../../../../actions/operator';

const LogsBlock = ({
  drawingName,
  sideBarData,
  getOperatorLogs,
  logs,
  loading
}) => {
  useEffect(() => {
    if (sideBarData) {
      getOperatorLogs(sideBarData.id);
    }
  }, [getOperatorLogs, sideBarData]);

  return !loading && (
    <TasksPanelWrapper>
      <TitleSection>
        <TaskTitle variant="h4">
          LOG
        </TaskTitle>
      </TitleSection>
      <LogsWrapper>
        <SummaryBlock drawingName={drawingName} sideBarData={sideBarData} />
      </LogsWrapper>
      <LogsWrapper>
        <ListComponent>
          <LogsList logs={logs} />
        </ListComponent>
      </LogsWrapper>
    </TasksPanelWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  logs: selectOperatorLogs(),
  loading: selectLoadingLogs(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getOperatorLogs
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(LogsBlock);
