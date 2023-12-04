import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment'
import {
  SignalBlockWrapper,
  SignalsBlockContent,
  SignalsBlockHeader,
  SignalsWrapper,
} from './styledComponents';
import ContainedButton from '../../../../../../../components/Buttons/ContainedButton';
import { BUTTONS_TEXT } from '../../../../../../../constants';
import {
  clearActiveSignals,
  getSignalsForLineJobStation,
  getSignalTypes,
  getSignalUrgencyTypes,
  sendSignal,
} from '../../../../../../../actions/operator';
import {
  selectLineJobStationSignals,
  selectOperatorSidebarData,
  selectSignalTypes,
  selectUrgencySignalTypes,
} from '../../../../../../../selectors/operatorSelectors';
import Loader from '../../../../../../../components/Loader/Loader';
import { resetSignals } from '../../../../../../../actions/monitorActions';

const convertDateDiffSecondsToTime = (createdDateTime) => {
  const toUTC = moment.utc(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const diffInSeconds = moment(toUTC).diff(moment(createdDateTime), 'seconds');
  const convertToTwoDigitFormat = (num) => (num < 10 ? `0${num}` : num);
  const hours = convertToTwoDigitFormat(Math.floor(diffInSeconds / 3600));
  const minutes = convertToTwoDigitFormat(Math.floor((diffInSeconds - (hours * 3600)) / 60));
  const seconds = convertToTwoDigitFormat(diffInSeconds - (hours * 3600) - (minutes * 60));

  return `${hours}:${minutes}:${seconds}`;
};

const SignalsBlock = ({
  signalTypes,
  urgencySignalTypes,
  getSignalTypes,
  getSignalUrgencyTypes,
  operatorSidebarData,
  getSignalsForLineJobStation,
  sendSignal,
  clearActiveSignals,
  lineJobStationSignals,
  resetSignals,
}) => {
  const [choosedSignals, setChoosedSignals] = useState({});
  const [signalsCreatedTime, setSignalsCreatedTime] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const parseSignalsData = (response) => {
    const signalsData = response.data.reduce((signals, item) => {
      const { signalType, urgency } = item;
      signals[signalType.id] = urgency.description.toUpperCase();
      return signals;
    }, {});

    const signalCreatedTime = response.data.reduce((result, item) => {
      const { signalType, createdDateTime } = item;
      result[signalType.id] = convertDateDiffSecondsToTime(createdDateTime);
      return result;
    }, {});
    setChoosedSignals({ ...signalsData });
    setSignalsCreatedTime({ ...signalCreatedTime });
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      !!operatorSidebarData && getSignalsForLineJobStation(operatorSidebarData.id)
        .then(response => {
          parseSignalsData(response);
        }),
      getSignalTypes(),
      getSignalUrgencyTypes(),
    ]).then(() => setIsLoading(false));
  }, [
    getSignalTypes,
    getSignalUrgencyTypes,
    getSignalsForLineJobStation,
    operatorSidebarData,
  ]);

  useEffect(() => {
    let interval = null;
    if (Object.keys(signalsCreatedTime).length) {
      interval = setInterval(() => {
        const updatedCreatedTime = lineJobStationSignals.reduce((result, item) => {
          const { signalType, createdDateTime } = item;
          result[signalType.id] = convertDateDiffSecondsToTime(createdDateTime);
          return result;
        }, {});
        setSignalsCreatedTime(
          updatedCreatedTime,
        );
      }, 1000);
    } else if (!signalsCreatedTime) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [signalsCreatedTime, lineJobStationSignals]);

  const onSignalClick = (e, signalId, urgencyId) => {
    const { id } = operatorSidebarData;
    const body = {
      id,
      signalTypeId: signalId,
      signalUrgencyId: urgencyId,
    };
    sendSignal(id, body)
      .then(() => getSignalsForLineJobStation(id))
      .then(response => {
        parseSignalsData(response);
      });
  };
  const onSignalsClear = () => {
    const { id } = operatorSidebarData;
    getSignalsForLineJobStation(id).then(() => clearActiveSignals(id));
    setChoosedSignals({});
    setSignalsCreatedTime({});
    resetSignals();
  };

  return (
    <SignalsWrapper>
      {signalTypes.map(signal => (
        <SignalBlockWrapper
          key={signal.id}
          color={!!choosedSignals && choosedSignals[signal.id]}
        >
          <SignalsBlockHeader color={!!choosedSignals && choosedSignals[signal.id]}>
            <Typography variant="subtitle1">{signal.name.toUpperCase()}</Typography>
            <Typography variant="subtitle1">
              {!!signalsCreatedTime && signalsCreatedTime[signal.id]}
            </Typography>
          </SignalsBlockHeader>
          <SignalsBlockContent>
            {urgencySignalTypes.map(urgencySignal => (
              <ContainedButton
                key={urgencySignal.description}
                variant="contained"
                color="primary"
                colorType={urgencySignal.description.toLowerCase()}
                text={urgencySignal.description.toUpperCase()}
                borderRadius="3"
                onClick={(e) => onSignalClick(e, signal.id, urgencySignal.id)}
              />
            ))}
          </SignalsBlockContent>
        </SignalBlockWrapper>
      ))}
      <ContainedButton
        variant="contained"
        color="primary"
        colorType="classic"
        text={BUTTONS_TEXT.clearSignal}
        onClick={onSignalsClear}
      />
      <Loader open={isLoading} />
    </SignalsWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  signalTypes: selectSignalTypes(),
  urgencySignalTypes: selectUrgencySignalTypes(),
  operatorSidebarData: selectOperatorSidebarData(),
  lineJobStationSignals: selectLineJobStationSignals(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSignalTypes,
  getSignalUrgencyTypes,
  getSignalsForLineJobStation,
  sendSignal,
  clearActiveSignals,
  resetSignals,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(SignalsBlock);
